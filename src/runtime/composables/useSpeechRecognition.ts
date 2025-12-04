import { ref, computed, onMounted, onBeforeUnmount, readonly } from 'vue'
import type { Ref, DeepReadonly } from 'vue'

/**
 * Speech recognition Web API types
 * @see /bitrix/js/im/v2/component/textarea/src/components/audio-input/classes/audio-manager.js
 */
export type SpeechRecognitionErrorCode = 'aborted'
  | 'audio-capture'
  | 'bad-grammar'
  | 'language-not-supported'
  | 'network'
  | 'no-speech'
  | 'not-allowed'
  | 'service-not-allowed'

interface SpeechGrammar {
  src: string
  weight: number
}

interface SpeechGrammarList {
  readonly length: number
  addFromString: (string: string, weight?: number) => void
  addFromURI: (src: string, weight?: number) => void
  item: (index: number) => SpeechGrammar
  [index: number]: SpeechGrammar
}

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: SpeechRecognitionErrorCode
  readonly message: string
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultList
}

interface SpeechRecognitionEventMap {
  audioend: Event
  audiostart: Event
  end: Event
  error: SpeechRecognitionErrorEvent
  nomatch: SpeechRecognitionEvent
  result: SpeechRecognitionEvent
  soundend: Event
  soundstart: Event
  speechend: Event
  speechstart: Event
  start: Event
}

export interface SpeechRecognition extends EventTarget {
  continuous: boolean
  grammars: SpeechGrammarList
  interimResults: boolean
  lang: string
  maxAlternatives: number
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  abort: () => void
  start: () => void
  stop: () => void
  addEventListener: (<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void)
  removeEventListener: (<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | EventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void)
}

export interface SpeechRecognitionOptions {
  /** Recognition language (default: 'en-US') */
  lang?: string
  /** Continuous recognition (default: true) */
  continuous?: boolean
  /** Interim results (default: true) */
  interimResults?: boolean
  /** Максимальное количество альтернатив (по умолчанию: 1) */
  maxAlternatives?: number
}

export interface SpeechRecognitionResult {
  /** Recognized text */
  text: string
}

export interface SpeechRecognitionState {
  /** Whether speech recognition is available in the browser */
  isAvailable: boolean
  /** Whether recognition is currently active */
  isListening: boolean
  /** All recognized text (accumulated if continuous mode) */
  lastRecognizedText: string
}

export interface SpeechRecognitionControls {
  /** Start recognition */
  start: () => Promise<boolean>
  /** Stop recognition */
  stop: () => Promise<boolean>
  /** Toggle recognition state */
  toggle: () => Promise<boolean>
  /** Set recognition language */
  setLanguage: (lang: string) => boolean
}

export interface SpeechRecognitionEvents {
  /** Called when recognition starts */
  onStart?: () => void
  /** Called when recognition ends */
  onEnd?: () => void
  /** Called on error */
  onError?: (error: string) => void
  /** Called when a result is received */
  onResult?: (result: SpeechRecognitionResult) => void
}

/**
 * Universal composable for speech recognition
 * Can be used with any input components (Input, Textarea, etc.)
 */
export function useSpeechRecognition(
  options: SpeechRecognitionOptions = {},
  events: SpeechRecognitionEvents = {}
) {
  const {
    lang = 'en-US',
    continuous = true,
    interimResults = true,
    maxAlternatives = 1
  } = options

  const {
    onStart,
    onEnd,
    onError,
    onResult
  } = events

  // State
  const state = ref<SpeechRecognitionState>({
    isAvailable: false,
    isListening: false,
    lastRecognizedText: ''
  })

  // Recognizer instance
  let recognizer: SpeechRecognition | undefined

  // Computed properties
  const isAvailable = computed(() => state.value.isAvailable)
  const isListening = computed(() => state.value.isListening)

  /**
   * Initialize speech recognition
   */
  const init = (): boolean => {
    if (typeof window === 'undefined') {
      onError?.('Speech recognition is not available in this environment')
      return false
    }

    const SpeechRecognition = window && (
      (window as any).SpeechRecognition
      || (window as any).webkitSpeechRecognition
    )

    if (!SpeechRecognition) {
      state.value.isAvailable = false
      onError?.('Speech recognition is not supported in this browser')
      return false
    }

    try {
      recognizer = new SpeechRecognition() as SpeechRecognition
      recognizer.lang = lang
      recognizer.continuous = continuous
      recognizer.interimResults = interimResults
      recognizer.maxAlternatives = maxAlternatives

      // Настройка обработчиков событий
      setupEventHandlers()

      state.value.isAvailable = true
      return true
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to initialize speech recognition')
      state.value.isAvailable = false
      return false
    }
  }

  /**
   * Set up event handlers
   */
  const setupEventHandlers = () => {
    if (!recognizer) return

    recognizer.onstart = () => {
      state.value.isListening = true
      onStart?.()
    }

    recognizer.onerror = (event: SpeechRecognitionErrorEvent) => {
      state.value.isListening = false
      onError?.(event.error)
    }

    recognizer.onend = () => {
      state.value.isListening = false
      onEnd?.()
    }

    recognizer.onresult = (event: SpeechRecognitionEvent) => {
      const recognizedText = _getRecognizedText(event)
      const nextText = _getNewText(recognizedText)

      if (nextText !== '') {
        onResult?.({ text: nextText })
      }

      state.value.lastRecognizedText = recognizedText
    }
  }

  const _getRecognizedText = (event: SpeechRecognitionEvent): string => {
    let recognizedChunk = ''
    Object.values(event.results).forEach((result) => {
      if (result.isFinal) {
        return
      }
      const [alternative] = result
      const { transcript } = alternative as any
      recognizedChunk += transcript
    })

    return recognizedChunk
  }

  const _getNewText = (fullText: string): string => {
    let additionalText = ''
    const lastChunkLength = state.value.lastRecognizedText.length
    if (fullText.length > lastChunkLength) {
      additionalText = fullText.slice(lastChunkLength)
    }

    return additionalText
  }

  /**
   * Start speech recognition
   */
  const start = async (): Promise<boolean> => {
    if (!state.value.isAvailable) {
      return false
    }

    if (state.value.isListening) {
      return false
    }

    if (!recognizer) {
      if (!init()) {
        return false
      }
    }

    try {
      recognizer!.start()
      return true
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to start speech recognition')
      return false
    }
  }

  /**
   * Stop speech recognition
   */
  const stop = async (): Promise<boolean> => {
    if (!state.value.isListening || !recognizer) {
      return false
    }

    try {
      recognizer.stop()
      return true
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to stop speech recognition')
      return false
    }
  }

  /**
   * Toggle recognition state
   */
  const toggle = async (): Promise<boolean> => {
    if (state.value.isListening) {
      return stop()
    } else {
      return start()
    }
  }

  /**
   * Set recognition language
   */
  const setLanguage = (lang: string): boolean => {
    if (!recognizer) {
      return false
    }

    try {
      recognizer.lang = lang
      return true
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to set language')
      return false
    }
  }

  // Initialize on mount
  onMounted(() => {
    init()
  })

  // Cleanup on unmount
  onBeforeUnmount(() => {
    if (state.value.isListening) {
      stop()
    }

    recognizer = undefined
  })

  return {
    // State (readonly)
    state: readonly(state) as DeepReadonly<Ref<SpeechRecognitionState>>,

    // Computed properties
    isAvailable,
    isListening,

    // Controls
    start,
    stop,
    toggle,
    setLanguage,

    // Recognizer instance (for advanced usage)
    recognizer
  }
}

/**
 * Return type of useSpeechRecognition
 */
export type UseSpeechRecognitionReturn = ReturnType<typeof useSpeechRecognition>
