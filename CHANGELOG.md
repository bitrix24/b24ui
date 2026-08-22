# Changelog

## [2.13.0](https://github.com/bitrix24/b24ui/compare/v2.12.0...v2.13.0) (2026-08-22)


### Features

* **CheckboxGroup/RadioGroup:** support `icon` in items ([#464](https://github.com/bitrix24/b24ui/issues/464)) ([a2d9083](https://github.com/bitrix24/b24ui/commit/a2d9083d900e7c8832647da37d6bd4ff76a747d6))


### Bug Fixes

* **Range:** forward aria attributes to the thumb ([#466](https://github.com/bitrix24/b24ui/issues/466)) ([4e42a22](https://github.com/bitrix24/b24ui/commit/4e42a221295eff94dbabbbbeecb778ef09991c48))


### Chore

* **sync:** reconcile the last four entries with [#464](https://github.com/bitrix24/b24ui/issues/464) and [#466](https://github.com/bitrix24/b24ui/issues/466) ([#467](https://github.com/bitrix24/b24ui/issues/467)) ([30b4c1f](https://github.com/bitrix24/b24ui/commit/30b4c1fbdab6d289e47513f51ffca69547cf6080))

## [2.12.0](https://github.com/bitrix24/b24ui/compare/v2.11.0...v2.12.0) (2026-08-21)


### Features

* **ProgressGroup:** new component ([#443](https://github.com/bitrix24/b24ui/issues/443)) ([367cbf5](https://github.com/bitrix24/b24ui/commit/367cbf5ea17ecb8a1ceefb3da120eb3d5ea50e8c))
* **Splitter:** new component ([#441](https://github.com/bitrix24/b24ui/issues/441)) ([62a2acc](https://github.com/bitrix24/b24ui/commit/62a2acc83dea33baa63d55ab1e8a1ce1b2cb4f43))
* **theme:** tokenize the popup height caps ([#430](https://github.com/bitrix24/b24ui/issues/430)) ([648cd19](https://github.com/bitrix24/b24ui/commit/648cd19e627122875d37baa2c4952c7016874ae1)), closes [#73](https://github.com/bitrix24/b24ui/issues/73)
* **vue:** support `experimental.componentDetection` ([#396](https://github.com/bitrix24/b24ui/issues/396)) ([530b961](https://github.com/bitrix24/b24ui/commit/530b96165b9bdf250f596fc7c599042f947d8c3f))


### Bug Fixes

* **Calendar:** correct the size scale ([#394](https://github.com/bitrix24/b24ui/issues/394)) ([7ca3e74](https://github.com/bitrix24/b24ui/commit/7ca3e745066a790bcf535f9a600a1d4ef1b56e62))
* **CommandPalette:** cut search highlights on grapheme clusters, not code points ([#371](https://github.com/bitrix24/b24ui/issues/371)) ([54b93e3](https://github.com/bitrix24/b24ui/commit/54b93e33ec8cac5af65a1c8e505caebb7df26514))
* **CommandPalette:** keep astral characters intact when truncating search results ([#365](https://github.com/bitrix24/b24ui/issues/365)) ([01252a6](https://github.com/bitrix24/b24ui/commit/01252a62cf991cb44a7495283564669336857234)), closes [#339](https://github.com/bitrix24/b24ui/issues/339)
* **CommandPalette:** weigh the grapheme-snap ceiling against the value ([#388](https://github.com/bitrix24/b24ui/issues/388)) ([c909bc7](https://github.com/bitrix24/b24ui/commit/c909bc7df603b2ef462c0f84c9a98390effe66af))
* **components:** resolve theme props consistently in form controls ([#397](https://github.com/bitrix24/b24ui/issues/397)) ([6b7920f](https://github.com/bitrix24/b24ui/commit/6b7920f97858d81083efe43183da1ddfa1072313))
* **ContentSearch:** stop `sanitizeSnippet` rebuilding tags from its input ([#405](https://github.com/bitrix24/b24ui/issues/405)) ([fe4a466](https://github.com/bitrix24/b24ui/commit/fe4a466dc8341cce48159ecef151c30a1d84045a))
* **ContentSearch:** stop escaping content that its sink escapes anyway ([#414](https://github.com/bitrix24/b24ui/issues/414)) ([9096fda](https://github.com/bitrix24/b24ui/commit/9096fda1be7a73c6d07b2d717889b7b41a08d79c))
* **docs:** move the AI providers onto the provider spec ai@7 expects ([#438](https://github.com/bitrix24/b24ui/issues/438)) ([e3f48be](https://github.com/bitrix24/b24ui/commit/e3f48be59e6df70cd1fa7962abf251d3ffe46b0c))
* **Editor:** ignore updates without document changes ([#355](https://github.com/bitrix24/b24ui/issues/355)) ([e198cf7](https://github.com/bitrix24/b24ui/commit/e198cf79c0294f1aa71aa5490b653fac92f991d9))
* **icons:** make the dictionary's promises true, and enforce both of them ([#382](https://github.com/bitrix24/b24ui/issues/382)) ([924c3a8](https://github.com/bitrix24/b24ui/commit/924c3a83182ba640d1bf97970987bb6ef138e622))
* **icons:** route components through the dictionary ([#399](https://github.com/bitrix24/b24ui/issues/399)) ([4295af8](https://github.com/bitrix24/b24ui/commit/4295af807ea3e03a07e074a0e4d5b4ed425de41d)), closes [#380](https://github.com/bitrix24/b24ui/issues/380)
* **locale:** use the endonym for Hindi and close the Chinese bracket ([#367](https://github.com/bitrix24/b24ui/issues/367)) ([b084ccb](https://github.com/bitrix24/b24ui/commit/b084ccb74e62c6b68e90e492a61d3fdcaf28b092))
* **Modal:** return focus to the trigger after closing ([#458](https://github.com/bitrix24/b24ui/issues/458)) ([3caa3c0](https://github.com/bitrix24/b24ui/commit/3caa3c040bfcef299c1adf16ccc7b7dadf4014ae)), closes [#159](https://github.com/bitrix24/b24ui/issues/159)
* **Range:** bind form aria attributes on thumbs instead of root ([#431](https://github.com/bitrix24/b24ui/issues/431)) ([6ac1671](https://github.com/bitrix24/b24ui/commit/6ac16717fef4eb30cd9c4117ace32cdf89aeab50))
* **theme:** blank top-level `base` in `applyUnstyled` ([#368](https://github.com/bitrix24/b24ui/issues/368)) ([c64c2b0](https://github.com/bitrix24/b24ui/commit/c64c2b08a85384e91256ddd02ae3c2643158e654))
* **theme:** keep variants when replacing slot classes in app config ([#407](https://github.com/bitrix24/b24ui/issues/407)) ([65ff532](https://github.com/bitrix24/b24ui/commit/65ff5325e5d03a7404368e26f54cfca174199439))
* **Theme:** merge `class` from `props` with the component class ([#403](https://github.com/bitrix24/b24ui/issues/403)) ([612b898](https://github.com/bitrix24/b24ui/commit/612b898344d48cc77ff58db55a1de82f67907876))
* **theme:** replace deprecated bare tailwind aliases ([#455](https://github.com/bitrix24/b24ui/issues/455)) ([3b1b017](https://github.com/bitrix24/b24ui/commit/3b1b017e6e204274ca4eead3ae2fa9e03d05e879))
* **theme:** respect reduced motion on movement transitions ([#384](https://github.com/bitrix24/b24ui/issues/384)) ([c10cfb3](https://github.com/bitrix24/b24ui/commit/c10cfb31c3471c608dc79dfb12df96371272cda8))
* **utils:** stop dotted-path walkers writing through the prototype chain ([#424](https://github.com/bitrix24/b24ui/issues/424)) ([901bc8a](https://github.com/bitrix24/b24ui/commit/901bc8a429a86f30977830a61db7907cdcdb157d))


### Docs

* **ComponentCode:** fix number input after clearing ([#370](https://github.com/bitrix24/b24ui/issues/370)) ([0bf9ec4](https://github.com/bitrix24/b24ui/commit/0bf9ec44dbe95da5ec6ced5d880aaf4b86f4cea0))
* **contributing:** add Telegram release post guidelines ([#460](https://github.com/bitrix24/b24ui/issues/460)) ([c7dbeb1](https://github.com/bitrix24/b24ui/commit/c7dbeb1b213cc1c00494e0429eee6497f1f59719))
* correct commands, install tab, branding and component count ([#426](https://github.com/bitrix24/b24ui/issues/426)) ([de72464](https://github.com/bitrix24/b24ui/commit/de72464d032dc0ca4a4e8ee7af92b296960525fd)), closes [#94](https://github.com/bitrix24/b24ui/issues/94)
* **FormField:** document the label slot ([#461](https://github.com/bitrix24/b24ui/issues/461)) ([32b76b1](https://github.com/bitrix24/b24ui/commit/32b76b19cbca5a7fabc1dd8148576ed85ac1fac2)), closes [#48](https://github.com/bitrix24/b24ui/issues/48)
* **mcp:** add `x-mcp-tools` header to specify available tools ([#373](https://github.com/bitrix24/b24ui/issues/373)) ([28e4250](https://github.com/bitrix24/b24ui/commit/28e4250ac370cf85b663acad7f5705c57b148328))
* **mcp:** rank component search by intent and compact the metadata ([#389](https://github.com/bitrix24/b24ui/issues/389)) ([e66d494](https://github.com/bitrix24/b24ui/commit/e66d4948c586a75fc759d9509195de1002b6001a))
* **mcp:** resolve examples by their prerendered name ([#393](https://github.com/bitrix24/b24ui/issues/393)) ([1f4399f](https://github.com/bitrix24/b24ui/commit/1f4399f2be540813b1316c19f1ca173085a4c84b))
* **playgrounds:** position markup with logical properties ([#416](https://github.com/bitrix24/b24ui/issues/416)) ([0ea7203](https://github.com/bitrix24/b24ui/commit/0ea7203a923ecdadeb087e67343f308ab032bef6))
* **release:** document the CI approval and the `revert:` subject ([#440](https://github.com/bitrix24/b24ui/issues/440)) ([4211cab](https://github.com/bitrix24/b24ui/commit/4211cabb7d224f0eeebe011965f015e4c9375dbf))
* **rtl:** align table examples to the end, mirror the trailing slot ([#413](https://github.com/bitrix24/b24ui/issues/413)) ([8d794ca](https://github.com/bitrix24/b24ui/commit/8d794ca2edf99147e9e5d0ebcf85412ed2321209))
* **rtl:** position examples with logical properties ([#401](https://github.com/bitrix24/b24ui/issues/401)) ([47f8c9a](https://github.com/bitrix24/b24ui/commit/47f8c9acb331c9b6870379680e82f88cf86d9032)), closes [#400](https://github.com/bitrix24/b24ui/issues/400)
* **showcase:** widen the screenshotOptions schema ([#432](https://github.com/bitrix24/b24ui/issues/432)) ([807d52e](https://github.com/bitrix24/b24ui/commit/807d52efaf8a29cc23b97df3a047c082752bfad0))
* **skills:** position recipe markup with logical properties ([#415](https://github.com/bitrix24/b24ui/issues/415)) ([cc58a1e](https://github.com/bitrix24/b24ui/commit/cc58a1e73f49ffa69c2264f34575870f7621ee1c))
* **sync:** check dependency parity with upstream, not just the queue ([#429](https://github.com/bitrix24/b24ui/issues/429)) ([848bc19](https://github.com/bitrix24/b24ui/commit/848bc1908c2ba78c9d079fbe129c31d5174254da))
* **sync:** correct four false claims about `search.ts` and its coverage ([#409](https://github.com/bitrix24/b24ui/issues/409)) ([fe077e9](https://github.com/bitrix24/b24ui/commit/fe077e92d86b996ff0c0a91026425738eb0aa812))
* **sync:** correct three claims left stale by closing [#380](https://github.com/bitrix24/b24ui/issues/380) ([#402](https://github.com/bitrix24/b24ui/issues/402)) ([bf3444d](https://github.com/bitrix24/b24ui/commit/bf3444d328051cc49b312e23cfddca55943c6adf))
* **sync:** record that upstream's Slider is this fork's Range ([#423](https://github.com/bitrix24/b24ui/issues/423)) ([844830f](https://github.com/bitrix24/b24ui/commit/844830f24ddf6315952b99a953aa2a95a4f00479))
* **sync:** record the b24ui-only `useTokenSearch` divergence as a porting invariant ([#366](https://github.com/bitrix24/b24ui/issues/366)) ([7ce6238](https://github.com/bitrix24/b24ui/commit/7ce6238cbaccdbb6c6569a50c87aaca5f429a5fc))
* **sync:** register new components in every docs and playground registry ([#447](https://github.com/bitrix24/b24ui/issues/447)) ([a9d1b95](https://github.com/bitrix24/b24ui/commit/a9d1b952f4e1e2d1bcab87e5377c205dbda80a9a))
* **table:** pin TanStack Table links to v8 ([#445](https://github.com/bitrix24/b24ui/issues/445)) ([fc562bc](https://github.com/bitrix24/b24ui/commit/fc562bcefd685fd8f5fe0ace4d99293a46359c16))
* **tabs:** improve content section ([#383](https://github.com/bitrix24/b24ui/issues/383)) ([1c1a61a](https://github.com/bitrix24/b24ui/commit/1c1a61a8a88eec05d80cba90a0270c38d105b892))
* use logical properties so the tree indent and timeline flip under RTL ([#386](https://github.com/bitrix24/b24ui/issues/386)) ([171dc14](https://github.com/bitrix24/b24ui/commit/171dc14a84f22b93b9925eb088812febb913c093))


### Tests

* **CommandPalette:** cover the b24ui-only `useTokenSearch` argument ([#369](https://github.com/bitrix24/b24ui/issues/369)) ([531921a](https://github.com/bitrix24/b24ui/commit/531921ad34504b118b9fcb455ffeb6049170e8ff))
* **CommandPalette:** cover the gaps an independent review pass found ([#390](https://github.com/bitrix24/b24ui/issues/390)) ([18dc2ff](https://github.com/bitrix24/b24ui/commit/18dc2ff7658ddf15f049645e54a7484de0412528))
* **CommandPalette:** drive real fuse.js at the mark-insertion boundary ([#385](https://github.com/bitrix24/b24ui/issues/385)) ([fc89b5f](https://github.com/bitrix24/b24ui/commit/fc89b5fe0d6abd070ad6ce2b50a8142c32f73602))
* **CommandPalette:** pin the CRLF conjunction and the malformed-region guard ([#412](https://github.com/bitrix24/b24ui/issues/412)) ([73b9044](https://github.com/bitrix24/b24ui/commit/73b904462fbd145c7d46fb4e76ce0581d781ea2d))
* **locale:** guard message keys, placeholders and codes across locales ([#372](https://github.com/bitrix24/b24ui/issues/372)) ([f958a55](https://github.com/bitrix24/b24ui/commit/f958a552a9db48cc2a47cb2fea757a3f1e3946eb))
* pin the suite timezone to UTC ([#418](https://github.com/bitrix24/b24ui/issues/418)) ([24f17f9](https://github.com/bitrix24/b24ui/commit/24f17f991895f3a6ab372a1a28794c090793d852)), closes [#84](https://github.com/bitrix24/b24ui/issues/84)
* **Table:** give the `date` column something to assert ([#448](https://github.com/bitrix24/b24ui/issues/448)) ([8163f55](https://github.com/bitrix24/b24ui/commit/8163f5552ca76f2f2e6ad331209361bd8186732a))
* **Table:** make the `status` column's colour branches reachable ([#452](https://github.com/bitrix24/b24ui/issues/452)) ([2c8661b](https://github.com/bitrix24/b24ui/commit/2c8661b22e2ce5a24cf287073b7714fa3878e550))


### Chore

* **deps:** align dependencies with upstream, including two majors ([#425](https://github.com/bitrix24/b24ui/issues/425)) ([e5c7e65](https://github.com/bitrix24/b24ui/commit/e5c7e658bfcc87788c0aa02ff7d86779a3e4ed5b))
* **deps:** declare TypeScript instead of deriving it ([#453](https://github.com/bitrix24/b24ui/issues/453)) ([5b7ae68](https://github.com/bitrix24/b24ui/commit/5b7ae688b5ba4e27565e8353ec57e1a008595a98))
* **deps:** narrow tailwind source scope in docs and playgrounds ([#417](https://github.com/bitrix24/b24ui/issues/417)) ([72a5957](https://github.com/bitrix24/b24ui/commit/72a595726fb10827a1d62727c05c10330e504aa8))
* **deps:** update `@nuxtjs/mdc` to ^0.23.1 ([#360](https://github.com/bitrix24/b24ui/issues/360)) ([27b4db3](https://github.com/bitrix24/b24ui/commit/27b4db3001e96605ffa6fdfb2ee242b80fe78c87))
* **deps:** update all non-major dependencies ([#357](https://github.com/bitrix24/b24ui/issues/357)) ([575e44b](https://github.com/bitrix24/b24ui/commit/575e44bebf107a3061125b906ce4d47ec6efdafc))
* **deps:** update dependency reka-ui to v2.10.3 ([#428](https://github.com/bitrix24/b24ui/issues/428)) ([c602ea0](https://github.com/bitrix24/b24ui/commit/c602ea0689c94dca3831ce313745271b039f8246))
* **deps:** update nuxt framework to ^4.5.2 ([#359](https://github.com/bitrix24/b24ui/issues/359)) ([770b965](https://github.com/bitrix24/b24ui/commit/770b96525ceaa5ba4833668f3bd1a6ff49681b6a))
* **deps:** update tiptap to ^3.29.2 ([#358](https://github.com/bitrix24/b24ui/issues/358)) ([b5355a5](https://github.com/bitrix24/b24ui/commit/b5355a54fcba4c9c1a95f14f9b7cd03da1c3c2f3))
* remove dead code ([#395](https://github.com/bitrix24/b24ui/issues/395)) ([c4d291c](https://github.com/bitrix24/b24ui/commit/c4d291c9849dd8fb8e56086ae8af8cfc0cd6daf9))
* **sync:** derive `icon-map.json` from the shared icon keys, and guard it ([#378](https://github.com/bitrix24/b24ui/issues/378)) ([af5dd57](https://github.com/bitrix24/b24ui/commit/af5dd5718b00f789a0fe9d06ae5e0bf9ad2b736c))
* **sync:** make the manual sync the only sync ([#377](https://github.com/bitrix24/b24ui/issues/377)) ([c1cfa78](https://github.com/bitrix24/b24ui/commit/c1cfa78f3dbf0d8196a595b19bce6da433027022))
* **sync:** reconcile 0fabbe5 and repair the cursor ([#408](https://github.com/bitrix24/b24ui/issues/408)) ([a56a173](https://github.com/bitrix24/b24ui/commit/a56a17357c3ef21b257913e61d14f84c375c5f5c))
* **sync:** reconcile 3dbca02 with its merged PR ([#374](https://github.com/bitrix24/b24ui/issues/374)) ([e7f1774](https://github.com/bitrix24/b24ui/commit/e7f1774bab76f57a8e4afe25701c9330e3dcb601))
* **sync:** reconcile 7c74269 with its merged PR ([#398](https://github.com/bitrix24/b24ui/issues/398)) ([b58b080](https://github.com/bitrix24/b24ui/commit/b58b080832c7070b78806c187d75329a27fc7cc2))
* **sync:** reconcile the 14ac2438 entry with [#443](https://github.com/bitrix24/b24ui/issues/443) ([#444](https://github.com/bitrix24/b24ui/issues/444)) ([53613e9](https://github.com/bitrix24/b24ui/commit/53613e99dfbfa6bba3acb1c6f2223cc4564e9b34))
* **sync:** reconcile the 545f9e37 and be58f3f5 entries with [#445](https://github.com/bitrix24/b24ui/issues/445) ([#446](https://github.com/bitrix24/b24ui/issues/446)) ([fa9cca4](https://github.com/bitrix24/b24ui/commit/fa9cca47d1e177ec9e080d6af2e5add6ce009098))
* **sync:** reconcile the a4fe7d86 and 08e75317 entries with [#419](https://github.com/bitrix24/b24ui/issues/419) ([#422](https://github.com/bitrix24/b24ui/issues/422)) ([0fbc91c](https://github.com/bitrix24/b24ui/commit/0fbc91cf65a2bce6d333ff63b50333cbbf063156))
* **sync:** reconcile the cf5f15e3 and f6d188bd entries with [#432](https://github.com/bitrix24/b24ui/issues/432) ([#433](https://github.com/bitrix24/b24ui/issues/433)) ([28677ed](https://github.com/bitrix24/b24ui/commit/28677edfa95c155173efeee5028208185cc5eeaf))
* **sync:** reconcile the e2a253ec, d4f2ca02 and a7f26a32 entries with [#455](https://github.com/bitrix24/b24ui/issues/455) ([#456](https://github.com/bitrix24/b24ui/issues/456)) ([593911f](https://github.com/bitrix24/b24ui/commit/593911f6b114e1c1298ecaf2830b18b7a1fe1ed2))
* **sync:** record CLAUDE.md and the bench scaling as skipped ([#439](https://github.com/bitrix24/b24ui/issues/439)) ([167cd6f](https://github.com/bitrix24/b24ui/commit/167cd6f3f42ee6c97a888f0953463d9c6545c6a2))
* **sync:** record the two calendar-template commits as not applicable ([#404](https://github.com/bitrix24/b24ui/issues/404)) ([9ea693d](https://github.com/bitrix24/b24ui/commit/9ea693d4357b80a45fd65353b7914d3743745c90))
* **sync:** record the volta.net and triadtrainer showcase entries as no-ops ([#442](https://github.com/bitrix24/b24ui/issues/442)) ([b6252d8](https://github.com/bitrix24/b24ui/commit/b6252d891521e7d8fe536bc69543b638f301404d))
* **sync:** record three upstream commits that do not apply ([#361](https://github.com/bitrix24/b24ui/issues/361)) ([c31d250](https://github.com/bitrix24/b24ui/commit/c31d250d192732857ffaa2e77f1bed2b6e19bda5))
* **theme:** sort the prose code icon map into upstream's order ([#419](https://github.com/bitrix24/b24ui/issues/419)) ([ef8ba7b](https://github.com/bitrix24/b24ui/commit/ef8ba7b8e429525b5c4c36065f34914d0941d24e))


### CI

* **release:** restore the `revert` and `feature` changelog sections ([#435](https://github.com/bitrix24/b24ui/issues/435)) ([cbd7c00](https://github.com/bitrix24/b24ui/commit/cbd7c0072ee8e60cb45614549a03214d821f8174))

## [2.11.0](https://github.com/bitrix24/b24ui/compare/v2.10.0...v2.11.0) (2026-08-10)


### Features

* **Timeline,Stepper:** resolve model values through valueKey for numbers too ([#326](https://github.com/bitrix24/b24ui/issues/326)) ([8891da1](https://github.com/bitrix24/b24ui/commit/8891da161a21b891f187769b419a2673551f545e))


### Bug Fixes

* **CommandPalette:** stop the raw label and suffix reaching v-html ([#338](https://github.com/bitrix24/b24ui/issues/338)) ([595923b](https://github.com/bitrix24/b24ui/commit/595923b9a3b5efb64c61aa78a6e61a4cdbfc4a85)), closes [#82](https://github.com/bitrix24/b24ui/issues/82)
* **deps:** declare `vue` as a peer dependency (requires Vue &gt;= 3.5) ([#351](https://github.com/bitrix24/b24ui/issues/351)) ([432e01d](https://github.com/bitrix24/b24ui/commit/432e01d76d29bd8db9b4f5df5aa6fb06671e66db))
* four component bugs — grouped children, leaked refs, KeepAlive, slot-only description ([#341](https://github.com/bitrix24/b24ui/issues/341)) ([e3d169a](https://github.com/bitrix24/b24ui/commit/e3d169ade594aeb3d415a511cf52b19c32c1e72e))
* leaked listeners in Countdown, accumulated observers in ChatMessages, dev-time style refresh ([#335](https://github.com/bitrix24/b24ui/issues/335)) ([85dc54e](https://github.com/bitrix24/b24ui/commit/85dc54ed05f897100292f97655c38f54cbfb67d7)), closes [#79](https://github.com/bitrix24/b24ui/issues/79) [#80](https://github.com/bitrix24/b24ui/issues/80) [#81](https://github.com/bitrix24/b24ui/issues/81) [#83](https://github.com/bitrix24/b24ui/issues/83)


### Docs

* **content:** using @nuxt/content in a client-only app ([#334](https://github.com/bitrix24/b24ui/issues/334)) ([8b9bf3f](https://github.com/bitrix24/b24ui/commit/8b9bf3f6ebd51dcb1122c08285536c3b0c29b69c)), closes [#332](https://github.com/bitrix24/b24ui/issues/332)
* **skill:** dead routing refs, phantom components, manifest desync, broken examples ([#343](https://github.com/bitrix24/b24ui/issues/343)) ([0fb88ac](https://github.com/bitrix24/b24ui/commit/0fb88acf0e2bef241e9ba0c74c9126bf6d0e9fab))
* **skill:** generate skills/index.json instead of hand-maintaining it ([#346](https://github.com/bitrix24/b24ui/issues/346)) ([227cd4e](https://github.com/bitrix24/b24ui/commit/227cd4e96414e66bd7d008e9ed95fcc01a21dff9))
* **sync:** record the Timeline/Stepper resolution divergence as a porting invariant ([#330](https://github.com/bitrix24/b24ui/issues/330)) ([87a5933](https://github.com/bitrix24/b24ui/commit/87a593380436c4c4edbcc0353257a502bb49722a))


### Chore

* **deps:** allow `typescript` v7 as peer dependency (e7b126b) ([#348](https://github.com/bitrix24/b24ui/issues/348)) ([0748129](https://github.com/bitrix24/b24ui/commit/074812954b5fd1a85e71a3b71d0b66f6dee21383))
* **sync:** reconcile e7b126b with its merged PR ([#350](https://github.com/bitrix24/b24ui/issues/350)) ([480098a](https://github.com/bitrix24/b24ui/commit/480098afb7918a8610152b33decd1ccc1ef96c83))
* **sync:** reconcile the deferred takumi entry with [#324](https://github.com/bitrix24/b24ui/issues/324) ([#325](https://github.com/bitrix24/b24ui/issues/325)) ([aa9d6c2](https://github.com/bitrix24/b24ui/commit/aa9d6c225e5b1f4e45a44e894ecaf43ae02ffba2))


### CI

* automate releases with release-please and harden the publish gate ([#327](https://github.com/bitrix24/b24ui/issues/327)) ([8be1522](https://github.com/bitrix24/b24ui/commit/8be152259c01f25a6ebbdfd16d05ed8e3b5952f0)), closes [#313](https://github.com/bitrix24/b24ui/issues/313)
* bump the github-actions group with 4 updates ([#333](https://github.com/bitrix24/b24ui/issues/333)) ([34ecc68](https://github.com/bitrix24/b24ui/commit/34ecc685d5478de6a59723a62b7726080ddf2cb8))
* finish the [#315](https://github.com/bitrix24/b24ui/issues/315) hardening with a release watchdog and pinned actions ([#331](https://github.com/bitrix24/b24ui/issues/331)) ([a825945](https://github.com/bitrix24/b24ui/commit/a8259458c1bdd3911e6b95a68fb0d35a8123d162))

## [2.10.0](https://github.com/bitrix24/b24ui/compare/v2.9.0...v2.10.0) (2026-08-06)

### Features

* **Listbox:** new component
* **InputRating:** new component
* **Calendar:** add month and year selection
* **prose:** configurable heading anchors and copy button
* **Empty:** add `loading` and `loadingIcon` props
* **ChatPrompt:** add `body` slot
* **ChatTool:** add `actions` prop for tool approval
* **Prompt:** add claude action
* **Drawer:** add `close` and `closeIcon` props
* **Editor:** allow disabling starter kit for plain text
* **ContentToc:** scroll list independently and center active link
* **Table:** add `getScrollElement` virtualize option
* **ScrollArea:** add `getScrollElement` virtualize option

### Bug Fixes

* **module:** avoid unhead v2-only `hookOnce` in colors plugin — fixes app initialization crash in SPA mode (`ssr: false`) on Nuxt `>= 4.5.1`
* **module:** honour the `b24ui.version` option in `appConfig` — it was declared but ignored on the Nuxt path
* **Modal:** emit transition events from overlay when scrollable
* **theme:** unify motion easing and respect `prefers-reduced-motion`
* **ContentToc:** prevent list from collapsing
* **CommandPalette:** always escape search highlight to prevent XSS
* **theme:** use logical properties for RTL
* **components:** respect `prefers-reduced-motion` in animations
* **Editor:** prevent suggestion menu blinking on keystroke
* **types:** type prose components in app config
* **defineShortcuts:** defer standalone shortcuts that prefix a chain
* **defineShortcuts:** add missing `arrowdown` to shiftable keys
* **useToast:** dedupe duplicate ids and handle max of 0
* **useResizable:** recover from corrupted persisted storage
* **useResizable:** share resize logic between mouse and touch
* **useScrollspy:** unobserve previous headings on update
* **useFileUpload:** keep dropzone type filter reactive to `accept`
* **useComponentProps:** let app config `defaultVariants` override `withDefaults`
* **inertia:** make `useRoute().fullPath` reactive across navigations
* **FileUpload:** add `aria-disabled` attribute when disabled
* **SelectMenu/InputMenu:** only re-highlight first item with `create-item`
* **Link:** apply `rel` prop to internal links
* **ChatMessages:** re-evaluate streaming indicator on each render
* **Button:** allow inline event handlers with non-void return types
* **docs:** register `loadingIcon` cast so the Empty page prerenders

### Performance

* **components:** memoize tv slot invocations with simple args
* **Button/Select/SelectMenu/InputMenu:** narrow reactive dependencies
* **vue:** skip rewriting unchanged templates
* **module:** declare `sideEffects` for barrel tree-shaking
* **types:** decouple `useComponentProps` from the component-types barrel
* **types:** import cross-component types from source, not the barrel
* **components:** drop the redundant inner in component extend

### Docs

* use content native sqlite connector
* **input-rating:** remove stray `defaultValue` line in size
* **chat:** sanitize ai endpoint error logging
* **installation:** note vue-tsc build race with auto-import declarations
* **useCanonical:** type link array as unhead `Link[]`
* **typography:** improve headers and text page
* **select-menu/input-menu:** use grouped items in items type example
* **sidebar:** render examples with gpu transform
* **color-mode-button:** remove fallback slot example

### Tests

* add benchmarks
* **plugins:** bring `src/runtime/plugins/` under test — the directory matched no vitest `include`, so the SPA crash above could not have been caught
* **composables:** add specs for `defineLocale`, `useKbd` and `useFormField`
* **ChatPrompt:** avoid using fake timers before suspended

### Chore

* **deps:** update Nuxt framework to `^4.5.1` — moves `@unhead/vue` from `^2.1.15` to `^3.2.3` and Vite to v8
* **deps:** update Tiptap to `^3.29.0`, reka-ui to `v2.10.1`, `@nuxt/test-utils` to `^4.1.0`, and 40 package versions refreshed in total
* **docs:** drop the dead og-image stack — `@takumi-rs/core` and `nuxt-og-image` were unused and blocked upstream syncs; 54 packages leave the lockfile
* **github:** improve workflows
* **playground:** expose all public composables in repl
* sync with nuxt/ui upstream (no-op syncs)

## [2.9.0](https://github.com/bitrix24/b24ui/compare/v2.8.0...v2.9.0) (2026-06-27)

### Features

* **useTour:** new composable for guided tours
* **module:** add `theme.unstyled` option
* **theme:** allow replacing slot classes with a function
* **vite:** add `root` option to override `.b24ui-nuxt` directory location
* **components:** allow hiding icon with `false`
* **ChatMessage:** add `body` slot and improve actions alignment
* **ChatMessages:** expose `registerMessageRef`
* **ContentSearch:** add async search support via `search` / `searchStatus`
* **ContentSearch/DashboardSearch:** support `unmountOnHide` prop
* **ContentSearch/DashboardSearch:** forward input config to command palette
* **FileUpload:** expose `removeFile` in slots
* **Modal/Slideover:** add `leave` and `enter` events
* **PinInput:** add `separator` prop
* **ScrollArea:** add `shadow` prop
* **Select/SelectMenu:** use `multiple` in theme
* **Sidebar:** add `transition` prop

### Bug Fixes

* **Link:** fall back to original path when `localePath` fails
* **Link:** set default for `locale` prop
* **Separator:** forward fall-through attributes to root
* **components:** forward `$attrs` to root element when `to` prop is absent
* **components:** apply `theme.prefix` to hardcoded utility classes
* **module:** remove inline script in SPA mode for strict CSP
* **module:** merge custom variants into AppConfig type
* **module:** expose component theme keys in AppConfig type
* **module:** revert `tagPriority` to `-2` for inline style tag
* **module:** ship stripped `#build/b24ui.css` fallback for tooling
* **templates:** resolve vite root to an absolute path for `#build` aliases
* **ProseCodeCollapse:** cap root max-height instead of toggling pre height
* **ProseKbd:** type default slot as `VNode[]`
* **ProseKbd:** add default slot and make `value` optional
* **CommandPalette:** only scroll to highlighted item when focused
* **Select:** open menu on label click
* **SelectMenu:** bind `id` and aria attributes on trigger
* **InputMenu/SelectMenu:** re-highlight first item when items change
* **InputMenu/Select/SelectMenu:** respect `trailing: false` over default `trailingIcon`
* **InputNumber/InputDate/InputTime/Calendar:** restore `locale` prop
* **Tabs:** render active indicator during SSR
* **Modal/Slideover/Drawer:** suppress reka-ui `aria-hidden` focus warning
* **Form:** support setting the `name` attribute
* **Form:** add `method="post"` to prevent credential leaking via GET
* **ChatMessage:** add `wrap-break-word` to content slot
* **ContentSearch:** preserve intermediate ancestors in breadcrumb prefix
* **ContentToc:** apply `b24ui.trigger` prop to trigger elements
* **Textarea:** autoresize on mount with pre-filled value
* **FileUpload:** pass `disabled` attribute to button variant
* **docs:** resolve prerender payload 204 and build warnings
* **docs:** drop redundant homepage payload prerender ignore

### Docs

* **Chat:** refocus prompt when sidebar reopens
* **Chat:** validate AI assistant currentPage input
* **tabs:** add bottom tab bar example
* **search:** init index on nuxt ready
* **search:** improve relevance and tooltip behavior
* **form-field:** add a warning to help field
* **composables:** improve examples
* **navigation:** query `description` field for content toc
* **toast:** add `duration` prop docs and remove misleading AppConfig notes from examples
* SEO metadata and docs-tail bookkeeping (badges / community / typecheck)
* fix missing CSS variables on prerendered pages

### CI

* **deploy:** raise Node heap limit to fix docs prerender OOM
* move playground builds out of PR CI into the deploy job

### Chore

* **deps:** update Nuxt to `^4.4.6`, Tiptap `^3.24.0`, reka-ui `v2.9.8`, Vite, vue-tsc `^3.3.3`, vitest-environment-nuxt v2, pnpm v11, pnpm/action-setup v6 and 25 dependency refreshes in total
* **repl:** expose composables subpath in the playground
* sync with nuxt/ui upstream (no-op syncs)
* add `.cursor` to `.gitignore`

## [2.8.0](https://github.com/bitrix24/b24ui/compare/v2.7.1...v2.8.0) (2026-05-20)

### Features

* **Avatar/AvatarGroup:** add `color` prop
* **Breadcrumb:** add `color` prop
* **ChatMessage:** add `color` prop and `header` slot
* **Error:** add `icon` prop and `leading` slot
* **Error:** add `avatar` and `color` props alongside icon
* **CommandPalette:** search and highlight `description` field
* **ContentSearch/DashboardSearch:** enable Fuse.js token search by default
* **DashboardGroup:** add `storageOptions` prop
* **PageCard/PageCardGroup:** add `avatar` prop with Button.vue pattern

### Bug Fixes

* **ProsePrompt:** type `icon` prop as `IconComponent`
* **ProsePrompt:** preserve copy formatting and centralize icon registry
* **ProsePrompt:** preserve line breaks and lists when copying prompt
* **CommandPalette:** preserve relative order of `ignoreFilter` groups
* **CommandPalette:** only split tokens in highlight when `useTokenSearch` is enabled
* **CommandPalette:** update default fuse keys in docs and search components
* **defineShortcuts:** use `e.code` for alt shortcuts to handle macOS key remapping
* **useComponentProps:** treat array-typed theme values as `ClassValue` leaves
* **module:** don't require `@nuxtjs/mdc` when using `content` option

### Docs

* **Modal:** host the Sales dynamics widget in a Modal; add marketing/promo composition example
* **Card/Popover:** add Sales dynamics widget recipe and entity-info popover example
* **contributing:** note when `items.color` is required; document embedded-Avatar pattern and value slots
* remove stale "Soon" badges and coming-soon notes

### Chore

* **ci:** add CI workflow and gate npm publish on it
* **deps:** update all non-major dependencies (tailwindcss `^4.3.0`, reka-ui `2.9.7`, vue-tsc `^3.2.8`)
* **tests:** update snapshots

## [2.7.1](https://github.com/bitrix24/b24ui/compare/v2.7.0...v2.7.1) (2026-05-08)

### Features

* **PageCardGroup:** new component
* **Theme:** override component prop defaults
* **Separator:** add `position` prop

### Bug Fixes

* **Banner:** test localStorage
* **Form:** improve errors type
* **module:** pass computed ref directly to useHead innerHTML

### Docs

* **Search:** stabilize Fuse config reference to prevent re-indexing on every keystroke
* **Search:** restore Ask AI item in search results via ignoreFilter group
* **app:** move Search inside ClientOnly alongside Chat
* prerender navigation and move theme-color to composable
* improve agent readability surfaces
* gate `defineOgImage` / `useSchemaOrg` in `import.meta.server` and pass missing props
* improve og images compatibility with nuxt-og-image takumi

### Tests

* improve test snapshots and stabilize Checkbox/CheckboxGroup/Table/Theme suites

### Chore

* **deps:** update all non-major dependencies
* **skills:** add prose components definition

## [2.7.0](https://github.com/bitrix24/b24ui/compare/v2.6.1...v2.7.0) (2026-05-01)

### Features

* **ProsePrompt:** new component
* **tw:size:** improve size based on Tailwind CSS default widths (tsk:31740)

### Bug Fixes

* **ChatMessage:** make actions slot accessible on touch devices
* **ProseImg:** close zoom overlay on Escape key
* **Link:** prevent double-prefixing with `@nuxtjs/i18n` auto-localization
* **playgrounds/repl:** use b24-icons
* **playgrounds/repl:** use b24Link props
* **playgrounds/repl:** error NuxtLink (tsk:32534)
* **playgrounds/nuxt|demo:** control size (tsk:32362)
* **scripts/bx-translate-locales:** rebase to .claude

### Docs

* **ColorMode:** improve
* **form:** document `error-pattern` usage
* upgrade `nuxt-og-image` and add `nuxt-schema-org`

### Tests

* **Countdown:** improve
* **DescriptionList:** improve

## [2.6.1](https://github.com/bitrix24/b24ui/compare/v2.6.0...v2.6.1) (2026-04-27)

### Features

* **CommandPalette:** add `searchDelay` prop

### Bug Fixes

* **ContentSearch/DashboardSearch:** pick shared props from CommandPalette
* **ContentSearch:** speed up navigation mapping
* **ChatMessage/ChatMessages:** preserve generic message type in slot scope
* **Drawer:** handle RTL mode
* **ContextMenu|DropdownMenu|EditorSuggestionMenu|InputMenu|NavigationMenu|Select:** improve select state

### Chore

* **scripts/b24-self-task:** run AI with task description from bitrix24 (tsk:32364)
* **scripts/bx-translate-locales:** run AI for translate

## [2.6.0](https://github.com/bitrix24/b24ui/compare/v2.5.3...v2.6.0) (2026-04-23)

### ⚠ BREAKING CHANGES

* **module ** use `moduleDependencies` to manipulate options

### Features

* add standalone [Vue REPL playground](https://bitrix24.github.io/b24ui/play/#eNp9kT1PwzAQhv+K8VwSIWCpAhKgSoUBKmD0EjlHSHFsy3duI1X575wdWjpU3ez34/ycvJMP3hebCHIuK9Sh8yQQKHphatveKUmo5L2yylblZE8Xgt6bmoBvQlSr4BCWV0KbGpFL/eUtt5ZgjBNbF0xzUZV/GS5U5VFbzvgJ7exX1xZrdJY5dmmmktr1vjMQ3jx1zjLGXGQneTVP3r5kjUKE2V7X36B/TuhrHJKm5CoAQtiAkgeP6tACTfbi4xUGPh/M3jXRcPqM+Q7oTEyMU+wx2oaxj3KZ9rn3LlBn209cDAQW90sl0JQcc15J/oynM6v/414XN7mn7CjHX85Vljw=)
* **Sidebar:** new component
* **ChatShimmer:** new component
* **ChatReasoning:** new component
* **ChatTool:** new component
* **Tooltip:** support global content configuration via App tooltip prop
* **DropdownMenu:** add `filter` prop
* **InputMenu:** add `autocomplete` prop
* **Checkbox/Switch:** add support for `trueValue` / `falseValue`
* **FileUpload:** add `fileImage` prop
* **Table:** implement row pinning
* **unplugin:** add support for prose components
* **InputTime:** add `range` prop
* **ChatMessage:** add `files` slot
* **EditorSuggestionMenu:** expose suggestion matching options
* **Select:** support `item-aligned` position mode
* **components:** resolve `defaultVariants` in template logic
* **CommandPalette:** add `group-label` slot
* **Textarea:** expose `autoResize` method
* **Link:** auto-localize internal links when `@nuxtjs/i18n` is installed
* **Table:** support sticky header/footer in virtualized mode
* **Card:** add `title` and `description` props

### Bug Fixes

* **Error:** support `status` and `statusText` properties
* **ContentSurround:** handle RTL mode
* **Avatar:** use resolved size for image width/height
* **ProsePre:** move shiki line highlight styles to theme
* **Modal|Slideover:** improve theme
* **ChatShimmer:** handle RTL mode
* **DashboardSearchButton:** use valid HTML structure for trailing slot
* **module:** only auto-import public composables and allow Vite opt-out
* **FileUpload:** make multiple, accept and reset options reactive
* **Editor:** guard `lift` calls for unavailable list extensions
* **NavigationMenu:** improve RTL support for viewport and indicator
* **NavigationMenu:** propagate disabled state to item in vertical orientation
* **Modal/Slideover/Popover/Drawer:** prevent double `close:prevent` emit
* **ChatMessages:** keep indicator visible until first content arrives
* **ChatMessage:** hide files slot when no file parts exist
* **AI:** use `part.state` for streaming detection and deprecate `isReasoningStreaming`
* **module:** inline defaultVariants and prefix in dev template
* **ChatPrompt:** guard enter during composition
* **DashboardSidebar:** always pass `collapsed: false` in mobile menu slots
* **module:** transpile `reka-ui` to prevent injection errors
* **Modal/Slideover/Drawer:** suppress reka ui title and description warnings
* **Header/DashboardSidebar/Sidebar:** allow autofocus in menu for proper focus trapping
* **ChatMessages:** reset scroll icon when messages are cleared
* **ChatMessages:** prevent layout shift caused by indicator during streaming
* **Link:** ensure single-root rendering for `v-show` and `$el` resolution
* **module:** use relative `tagPriority` for inline style tags
* **InputTags:** add missing field group variant
* **ProsePre:** get code from DOM if `code` prop is missing
* **FieldGroup:** prevent context from leaking into portals
* **ChatPromptSubmit:** ignore `disabled` prop when status is not `ready`
* **ChatMessages:** use MutationObserver for auto-scroll during streaming
* **ProseCodeCollapse:** match background on overscroll
* **ProseImg:** respect markdown width attribute
* **InputDate/InputTime:** increase segments width
* **useDevice:** use breakpointsTailwind from '@vueuse/core'
* **ContentToc:** use links for scrollspy instead of hardcoded h2/h3
* **Accordion/Tabs:** use item value as stable key to avoid remounts
* **Modal/Slideover:** drop empty header wrapper when empty
* **FileUpload:** use form field `color` and `highlight` instead of raw props
* **Tooltip:** resolve incorrect style application for content slot via b24ui and class
* **LocaleSelect:** resolve incorrect flag display

### Docs

* improve build performance and client-side navigation
* **table:** add column span example
* **editor:** reorder drag handle as last child in examples
* **content:** update filenames to be consistent
* **input:** fix duplicated calling code in phone number example
* add Vue imports to code examples in Vue mode
* **ComponentCode/ComponentExample:** include framework in code key
* **ComponentCode/ComponentExample:** pre-render both framework code variants
* **header:** add animated toggle example
* **chat:** render user messages as plain text instead of markdown
* **select:** remove `by` prop mention
* **installation:** replace `classRegex` with `classFunctions` for Tailwind CSS IntelliSense
* **Chat:** add line height to user message text
* **Chat:** extract theme guide into tool and add framework context
* **mcp:** update to latest version
* **chat:** update tool names to match consolidated MCP tools
* **chat:** pass current page context and handle request abort
* **chat:** call tools directly instead of self-referential HTTP
* **chat:** migrate from `@nuxtjs/mdc` to `@comark/nuxt`
* **calendar:** improve date range picker example
* improve agent readability score
* **form:** update elements example
* **form:** add missing input tags in example

## [2.5.3](https://github.com/bitrix24/b24ui/compare/v2.5.2...v2.5.3) (2026-03-30)

### Features

* **skills:** add skills
* **Container:** improve theme
* **ProseCard:** support iconName
* **theming:** add bg and border like `text-default`, `bg-elevated`, `border-muted`

### Bug Fixes

* **module:** add `@source` on components

### Docs

* **install:** add templates

## [2.5.2](https://github.com/bitrix24/b24ui/compare/v2.5.1...v2.5.2) (2026-03-26)

### Features

* **useDevice:** new composables for detect the current platform (Bitrix24 mobile/desktop app or web) and screen size
* **playgrounds:** improve page shortcuts

### Bug Fixes

* **NavigationMenu:** improve theme
* **DashboardSidebar|Header:** improve menu

### Docs

* **dashboard:** improve

## [2.5.1](https://github.com/bitrix24/b24ui/compare/v2.4.2...v2.5.1) (2026-03-24)

### ⚠ BREAKING CHANGES

* **Slideover** remove usage `sidebarLayout` and improve theme

### Features

* **Toast** improve theme

### Bug Fixes

* **NavigationMenu** improve theme
* **DashboardSidebar** improve theme
* **DashboardPanel** improve theme

## [2.4.2](https://github.com/bitrix24/b24ui/compare/v2.4.1...v2.4.2) (2026-03-19)

### Features

* **platform** added utilities for determining the execution environment
* **DashboardToolbar** improve theme
* **NavigationMenu** improve theme and colors for `light`
* **DashboardNavbar** improve theme
* **DropdownMenu** improve theme
* **DashboardSidebar** improve theme
* **DashboardPanel** improve theme
* **Table** improve theme

### Bug Fixes

* **Input|Textarea:** padding for `noPadding+loading`
* **components:** improve `disabled` state
* **CommandPalette:** improve `back` button and divide color

### Chore

* **platform:** improve
* **air:** mark `--air-theme-bg-image-blurred` as `deprecate`. Now we use something like `backdrop-blur-md` or `backdrop-blur-md`

## [2.4.1](https://github.com/bitrix24/b24ui/compare/v2.4.0...v2.4.1) (2026-03-04)

### Features

* **designSystem:** add tw `scrollbar-both-edges`
* **colorMode:** add appConfig colorModeStorageKey

### Bug Fixes

* **Page:** make slot presence reactive for variant computation
* **useResizable:** use function declaration to prevent false auto-import
* **ContentToc:** add relative positioning to content slot
* **components:** improve arrow styling with `stroke-default` and `fill-bg`
* **components:** improve slots return types and tests

### Docs

* **deprecated:** mark components as deprecated
* **navigation-menu:** improve examples
* **input:** add phone number example

## [2.4.0](https://github.com/bitrix24/b24ui/compare/v2.3.0...v2.4.0) (2026-02-26)

### Features

* **plugins\platform:** detect `bitrixMobile`
* **Theme:** new component
* **Toaster:** prevent duplicate toasts and add pulse animation
* **Form:** add HTML5 validation to programmatic submit
* **NavigationMenu:** handle `chip` in items
* **NavigationMenu:** allow tooltip usage in `horizontal` orientation
* **ScrollArea:** add `skipMeasurement` virtualize option
* **dictionary:** add menu icon
* **dictionary:** add panel icon
* **Theme:** new component
* **Drawer:** new component
* **Header|Main|Footer|FooterColumns:** new component
* **Page|PageAside|PageBody|PageHeader|PageSection|PageFeature:** new component
* **DashboardNavbar|DashboardPanel|DashboardResizeHandle|DashboardSidebar|DashboardSidebarCollapse|DashboardSidebarToggle|DashboardToolbar:** new component
* **Header:** add `autoClose` prop

### Bug Fixes

* **Prose.A:** add prop `raw`
* **ColorModeImage:** add baseURL support for public paths
* **Table:** improve perfs with `shallowRef` when watch deep is disabled
* **EditorMentionMenu:** use `char` prop as mention prefix instead of always `@`
* **Checkbox/Switch:** prevent `data-state` conflict when used inside Tooltip
* **defineShortcuts:** add alt key guard
* **ChatMessages:** prevent flash at top before scrolling to bottom on mount
* **InputMenu/Select/SelectMenu:** exclude cosmetic items from model value type
* **colorMode:** improve
* **InputMenu/SelectMenu:** sort filtered items by match relevance
* **Toast:** allow `update` to keep toast open and reset duration
* **Toast:** improve animation smoothness
* **components:** nullable and optional type support
* **components:** add `fixed` prop to prevent responsive text size reduction
* **types:** improve `DotPathKeys` accuracy and `GetItemKeys` performance
* **NavigationMenu:** allow clicking trailing slot in horizontal orientation
* **NavigationMenu:** unique auto-generated item values for grouped items
* **defineShortcuts:** allow shifted special character shortcuts
* **types:** resolve `isArrayOfArray` type return
* **NavigationMenu:** prevent navigation when clicking trailing area in horizontal orientation
* **components:** prevent `transformUI` from mutating cached `useComponentUI` value

## [2.3.0](https://github.com/bitrix24/b24ui/compare/v2.2.1...v2.3.0) (2026-02-12)

### ⚠ BREAKING CHANGES

* **component-meta:** `B24UIMeta` remove from dist. Processing of this data is transferred to the future mcp documentation server.

### Features

* **Calendar:** add `weekNumbers` prop
* **CommandPalette/InputMenu/SelectMenu:** handle virtualizer `estimateSize` as function
* **CommandPalette:** add `input` prop
* **CommandPalette:** add `size` prop
* **components:** add `by` prop
* **components:** add `valueKey` prop
* **Editor:** add `placeholder.mode` prop
* **Editor:** add `size` prop in menus
* **Editor:** add `taskList` handler
* **Editor:** add support for code inside links
* **Editor:** handle boolean in `image` and `mention` props
* **EditorMentionMenu:** handle async search with `ignoreFilter` prop
* **EditorDragHandle:** proxy `nested` / `nestedOptions` props and emit `hover` event
* **InputMenu/Select/SelectMenu:** expose `viewportRef` for infinite scroll
* **InputMenu/SelectMenu:** add `clear` prop
* **Link:** support custom navigate function in vue
* **ProseTd/ProseTh:** handle `align` prop
* **Timeline/Stepper:** add wrapper slot and fix dynamic slot conditions
* **Timeline:** add `select` event

### Bug Fixes

* **Banner:** isolate banner visibility using per-instance CSS variables
* **Banner:** prevent XSS via id prop injection
* **CommandPalette/ContextMenu/DropdownMenu:** keyboard selection on link items
* **CommandPalette:** prevent XSS in search highlight
* **ContentSurround:** align next link to right on tablet without prev
* **defineShortcuts:** check shift modifier for special character shortcuts
* **Editor:** set `contentType` when updating value
* **Editor:** support all heading levels by default
* **EditorToolbar:** prevent `onClick` from being called twice on items
* **EditorToolbar:** prevent disabled dropdown when items have no kind
* **EditorToolbar:** proxy size prop to dropdown menu
* **Error:** render as `main` instead of `div`
* **FileUpload:** emit null when clearing file
* **FileUpload:** keep input visible when preview is disabled with multiple files
* **useOverlay:** refine close event argument extraction
* **CheckboxGroup:** update `update:modelValue` emit type
* **InputMenu/InputNumber/SelectMenu:** proxy `size` to buttons
* **InputMenu:** prevent focus on trailing button
* **Modal/Popover/Slideover:** prevent unexpected close on touch when interacting with other overlays
* **ChatMessages:** allow message props to override role defaults
* **useEditorMenu:** rank filtered results by relevance
* **NavigationMenu:** streamline linkLabelExternalIcon rendering by nesting component into linkLabel
* **Skeleton:** improve colors

## [2.2.1](https://github.com/bitrix24/b24ui/compare/v2.1.17...v2.2.1) (2025-12-18)

### Features

* **ScrollArea:** new component
* **unplugin:** add `scanPackages` option
* **unplugin:** add `router` option to disable router

### Bug Fixes

* **ChatMessage/ChatMessages:** improve colors

### Docs

* **editor:** improve loading icon on image upload

### Chore

* **deps:** update all non-major dependencies

## [2.1.17](https://github.com/bitrix24/b24ui/compare/v2.1.16...v2.1.17) (2025-12-17)

### Features

* **Slideover:** add `inset` prop
* **FormField:** add `orientation` prop

### Bug Fixes

* **ProseCallout:** ul/ol color
* **SidebarLayout:** support dark and light mode
* **Slideover:** fix scroll for long content

### Docs

* **template:** improve

## [2.1.16](https://github.com/bitrix24/b24ui/compare/v2.1.15...v2.1.16) (2025-12-16)

### Bug Fixes

* **ProseCallout/ProseCode/ProseCollapse/ProsePre:** improve dark and light theme

### Chore

* **deps:** update tailwindcss to ^4.1.18
* **deps:** update all non-major dependencies

## [2.1.15](https://github.com/bitrix24/b24ui/compare/v2.1.14...v2.1.15) (2025-12-15)

### Bug Fixes

* **EditorToolbar:** map dropdown items recursively to support `kind`

### Docs

* **app:** add component theme visualizer
* **editor:** add ai completion example

### Chore

* **deps:** update nuxt framework to ^4.2.2
* **useEditorCompletion:** use config.public.useAI for disable Completion

## [2.1.14](https://github.com/bitrix24/b24ui/compare/v2.1.13...v2.1.14) (2025-12-11)

### Features

* **locale/Indian:** add locale Indian (हिन्दी)
* **module:** generate `@source` for nuxt layers
* **extractShortcuts:** add `separator` option
* **twMergeConfig:** add `base-mode` in classGroups

### Bug Fixes

* **PageCard:** handle `reverse` prop under lg screens

### Docs

* **toast:** add callback example
* **use-overlay:** missing composable instance
* **extract-shortcuts:** add own page
* **composables:** add `defineLocale` and `extendLocale`

## [2.1.13](https://github.com/bitrix24/b24ui/compare/v2.1.12...v2.1.13) (2025-12-10)

### Bug Fixes

* **tw-style:** add in font size txt-xs, txt-sm, txt-md, txt-lg
* **dark:** now support dark theme: ContextMenu, DropdownMenu, EditorSuggestionMenu, Editor, EditorToolbar, InputMenu, Modal, NavigationMenu, Popover, Select, SelectMenu, Slideover, Tooltip
* **types:** add proseH5, proseH6
* **PageCard:** add $attrs to root
* **ContextMenuContent/DropdownMenuContent:** fix some warning
* **ProseA/ProseCallout/ProseCard:** improve focus styles
* **BlogPost/ChangelogVersion/PageFeature/User:** allow tab focus

### Docs

* **ai:** restore deepseek-reasoner
* **components:** remove redundant links inside callouts with to prop
* **Editor:** improve examples

## [2.1.12](https://github.com/bitrix24/b24ui/compare/v2.1.11...v2.1.12) (2025-12-09)

### Features

* **Editor:** new component
* **InputMenu/Select/SelectMenu:** add `modelModifiers` prop
* **ContextMenu/DropdownMenu:** expose `sub` prop on content slots
* **defineShortcuts:** add `layoutIndependent` option

### Bug Fixes

* **FormField:** hide error if error prop is false

### Docs

* fix GitHub link
* **file-upload:** correct `Schema` type casting
* **integrations:** add SSR page for Vue

### Chore

* **deps:** update all non-major dependencies
* **deps:** update tiptap to v3.13.0
* **Select:** add `aria-label` to axe test case
* **Popover:** add better comment about disabled Axe rule

## [2.1.11](https://github.com/bitrix24/b24ui/compare/v2.1.10...v2.1.11) (2025-12-04)

### Features

* **useSpeechRecognition:** add composable for speech recognition

### Bug Fixes

* **InputDate/InputTime:** add missing field group variant

### Docs

* **ChatAI:** improve
* **LocaleSelect:** improve GitHub link

## [2.1.10](https://github.com/bitrix24/b24ui/compare/v2.1.9...v2.1.10) (2025-12-02)

### Bug Fixes

* **ChatMessage:** colors

### Docs

* **contribution:** remove test vue command
* **Slideover:** fix overlay blur default value
* **ChatAI:** improve

### Chore

* **deps:** update dependency reka-ui to v2.6.1
* **InputDate:** usage `SegmentPart` from `reka-ui`
* **deps:** update all non-major dependencies
* **deps**: remove debug resolution
* **deps:** update vueuse monorepo to v14

## [2.1.9](https://github.com/bitrix24/b24ui/compare/v2.1.8...v2.1.9) (2025-12-01)

### Bug Fixes

* **ContentSearch/DasboardSearch:** set full height on mobile to prevent jump
* **Table:** only forward necessary props
* **ColorModeButton:** improve icon class merging

### Docs

* **input-date/input-time/calendar:** add note about date format
* **mcp:** use `@nuxtjs/mcp-toolkit`

### Chore

* **vitest:** move vue config into vitest project
* **components:** reduce type verbosity by omitting link props from action buttons

## [2.1.8](https://github.com/bitrix24/b24ui/compare/v2.1.7...v2.1.8) (2025-11-25)

### Bug Fixes

* **Table:** properly position pinned columns based on `size`
* **Button:** some improve the label style

### Docs

* **llms:** improve generate
* **transformMDC:** improve generate

### Chore

* **deps:** update all non-major dependencies
* **deps:** update actions/checkout action to v6

## [2.1.7](https://github.com/bitrix24/b24ui/compare/v2.1.6...v2.1.7) (2025-11-24)

### Bug Fixes

* **module:** put back `#build/ui.css` alias
* **ChatPromptSubmit:** proxy event to `stop` and `reload` emits
* **Range:** add `aria-label` to thumb
* **ProseCard:** change hover text color

### Docs

* **installation/vue:** typo fix
* **typography/CardGroup:** typo fix
* **ComponentCode:** add missing cast imports
* **LLMs:** fix typo
* **transformMDC:** fix external links for self docs, improve generateComponentCode

## [2.1.6](https://github.com/bitrix24/b24ui/compare/v2.1.5...v2.1.6) (2025-11-20)

### Bug Fixes

* **Link:** ensure consistency across Nuxt, Vue and Inertia
* **Link:** define NuxtLinkProps instead of importing from `#app`

### Docs

* update props schema to prevent hydration issues
* **ComponentCode:** Improve import generation
* **llms:** Improve llms format
* **llms:** Improve llms format callout

## [2.1.5](https://github.com/bitrix24/b24ui/compare/v2.1.4...v2.1.5) (2025-11-19)

### Bug Fixes

* **NavigationMenu:** proxy `modelValue` / `defaultValue` in vertical orientation
* **NavigationMenu:** hide label and trailing with css when collapsed
* **ContentSearchButton/DashboardSearchButton:** hide label and trailing with css when collapsed
* **CheckboxGroup/RadioGroup/Switch:** consistent disabled styles

### Docs

* **navigation-menu:** incorrect index in model value example

### Chore

* **deps:** remove @vueuse/nuxt

## [2.1.4](https://github.com/bitrix24/b24ui/compare/v2.1.3...v2.1.4) (2025-11-18)

### Features

* **Table:** handle virtualizer `estimateSize` as function

### Bug Fixes

* **module:** scan layers when using component detection
* **ColorModeButton:** use css to display color mode icon
* **components:** calc virtualizer estimateSize based on item description
* **InputMenu:** prevent change event when selecting create item

### Docs

* improve llms

## [2.1.3](https://github.com/bitrix24/b24ui/compare/v2.1.2...v2.1.3) (2025-11-17)

### Features

* **components:** add `data-slot` attributes

### Bug Fixes

* **types:** export missing utils types
* **CommandPalette/ContentSearch:** improve performances and filtering logic
* **inertia:** set serverRendered dynamically to prevent SSR crash

### Docs

* **app:** improve navigation filtering logic
* **components:** add search to filter navigation

### Chore

* **deps:** update

## [2.1.2](https://github.com/bitrix24/b24ui/compare/v2.1.1...v2.1.2) (2025-11-13)

### Features

* **FileUpload:** add `preview` prop
* **icons:** use @bitrix24/b24icons-nuxt

### Bug Fixes

* **Link:** partial extend for `vue-router` and `inertia`
* **ProseCallout:** add MdnWebDocIcon|InfoCircleIcon

### Docs

* **config:** add extraAllowedHosts
* **input-date:** add DatePicker and DateRangePicker examples

## [2.1.1](https://github.com/bitrix24/b24ui/compare/v2.1.0...v2.1.1) (2025-11-11)

### Bug Fixes

* **components:** remove `locale` / `dir` props proxy
* **Advice:** restore icons and avatar
* **ChatMessage:** icons color improve

### Docs

* **mcp:** update deprecated server.tool()
* **chatAi:** add DeepSeek in dev mode
* **playground\nuxt:** add DeepSeek in dev mode

## [2.1.0](https://github.com/bitrix24/b24ui/compare/v2.0.9...v2.1.0) (2025-11-10)

### ⚠ BREAKING CHANGES

* **module:** properly export composables from module
* **components:** consistent exposed refs

### Features

* **components:** extend native HTML attributes
* **InputDate:** new component
* **InputTime:** new component

### Bug Fixes

* **FileUpload:** ensure native validation works with required
* **Input/InputNumber/Textarea:** make `modelModifiers` generic
* **components:** clean html attributes extend
* **vue:** check `import.meta.env.SSR` to support `vite-ssg`
* **Table:** apply styles to `th` based on column meta

### Docs

* **form:** type validate method schema
* **locale-select:** use `model-value` instead of `v-model` in examples

### Chore

* **deps:** update all non-major dependencies
* **deps:** update nuxt framework to ^4.2.1

## [2.0.9](https://github.com/bitrix24/b24ui/compare/v2.0.8...v2.0.9) (2025-11-04)

### Features

* **Modal:** add `scrollable` prop
* **module:** add `theme.prefix` option

### Bug Fixes

* **Form:** refine `nested` prop type handling and simplify logic

### Chore

* **deps:** update vue-tsc to ^3.1.3

## [2.0.8](https://github.com/bitrix24/b24ui/compare/v2.0.7...v2.0.8) (2025-11-01)

### Chore

* **deps:** remove `unimport` resolution

### Bug Fixes

* **RadioGroup:** update `update:modelValue` emit type
* **vite:** write theme templates

### Docs

* **llms:** expand `components-list` in raw markdown

## [2.0.7](https://github.com/bitrix24/b24ui/compare/v2.0.6...v2.0.7) (2025-10-30)

### Chore

* **ChatPrompt:** improve
* **ChatPromptSubmit:** improve
* **ChatPalette:** improve
* **deps:** update nuxt framework to ^4.2.0
* **deps:** patch `@nuxt/vite-builder`
* **Form:** skip tests because of race condition

### Docs

* **nuxt.config:** reduce component meta bundle size

### Bug Fixes

* **module:** detect lazy components when using `experimental.componentDetection`
* **NavigationMenu/Tabs:** ensure proper badge display
* **Button:** width for one icon

## [2.0.6](https://github.com/bitrix24/b24ui/compare/v2.0.5...v2.0.6) (2025-10-28)

### Features

* **dictionary/icons:** add arrowDown,arrowUp,stop,reload
* **chat:** new components: ChatMessages, ChatPalette, ChatPrompt, ChatPromptSubmit

### Chore

* **deps:** update all non-major dependencies
* **deps:** update vue-tsc to ^3.1.2
* **deps:** update devdependency vite to ^7.1.12

### Bug Fixes

* **utils\dashboard|SidebarLayout:** downgrade
* **ChatMessage:** some improve

## [2.0.5](https://github.com/bitrix24/b24ui/compare/v2.0.4...v2.0.5) (2025-10-27)

### Features

* **ChatMessage:** new component

### Bug Fixes

* **utils\dashboard:** added a little entropy

## [2.0.4](https://github.com/bitrix24/b24ui/compare/v2.0.3...v2.0.4) (2025-10-27)

### Bug Fixes
* **useFieldGroup:** change Symbol
* **DashboardGroup:** improve props

## [2.0.3](https://github.com/bitrix24/b24ui/compare/v2.0.2...v2.0.3) (2025-10-24)

### Features
* **InputNumber:** handle `increment` / `decrement` as booleans
* **SidebarLayout/DashboardGroup:** improve sidebarLoading hook

### Bug Fixes
* **Error:** render as `div` instead of `main`

## [2.0.2](https://github.com/bitrix24/b24ui/compare/v2.0.1...v2.0.2) (2025-10-23)

### Features
* **SidebarLayout/DashboardGroup:** add sidebarLoading hook

### Chore
* **deps:** update dependency reka-ui to v2.6.0

## [2.0.1](https://github.com/bitrix24/b24ui/compare/v2.0.0...v2.0.1) (2025-10-22)

### Features

* **ProseImg:** improve `zoom` transition
* **CommandPalette:** preserve group order in search results
* **CommandPalette:** add `children-icon` prop to use `trailing-icon` in input

### Bug Fixes
* **Breadcrumb:** handle `active` in items
* **ContextMenu/DropdownMenu:** allow item content class override
* **CommandPalette/ContextMenu/DropdownMenu:** ensure items truncate work & itemTrailingIcon color
* **ContentSearch:** de-duplicate description and suffix

## [2.0.0](https://github.com/bitrix24/b24ui/compare/v1.0.4...v2.0.0) (2025-10-21)

### ⚠ BREAKING CHANGES
* **components:** rename nullify modifier to nullable and add optional
* **Form:** don't mutate the form's state if transformations are enabled
* **Table:** consistent args order in select event
* **Slideover|SidebarLayout:** remove composable useSidebarLayout
* **FieldGroup:** rename from ButtonGroup

### Features

* **components:** implement virtualization and expose `b24ui` in slot props
* **components:** add `description` support in items and icons position
* **module:** add `experimental.componentDetection` option
* **overlays:** add `close` method to Popover slots
* **useToast:** handle `max` global configuration
* **menus:** add global event handlers and checkbox examples
* **prose:** new components (Callout, Collapsible, CodeCollapse, CodeIcon, Tabs, Accordion, Badge, Kbd, Steps, Card, CodeGroup, CodePreview, Script)
* **layout:** new components (Error, PageLinks, ContentSurround, ContentToc, Empty, PageCard, PageGrid, PageColumns, PageList)
* **inputs:** new components (CheckboxGroup, ColorPicker, FileUpload, InputTags, PinInput)
* **navigation:** new components (ContextMenu, Pagination, Timeline, User, Breadcrumb, ContentSearch, DashboardGroup, Stepper)
* **data-display:** new components (Table, Banner, Card)
* **color-mode:** improve configuration across all components
* **locale:** improve configuration

### Bug Fixes

* **prose:** fix colors, sizes and add hash support for headings
* **prose:** improve code hover and table sizing
* **layouts:** improve SidebarLayout theme and Slideover close button
* **NavigationMenu:** improve theme
* **Form:** remove Joi and Yup in favor of @standard-schema/spec
* **Form:** fix nested validation and reactivity issues
* **inputs:** fix hover states and remove unwanted styles
* **Table:** fix hydration errors and footer spacing
* **FileUpload:** fix focus management and image preview
* **Calendar:** fix width and color issues
* **unplugin:** handle components resolution with subpath

### Docs

* **app:** implement AI search
* **components:** add props, slots display components
* **examples:** add input mask demonstration

### Chore

* **deps:** import `@nuxt/ui-pro` components
* **tests:** add accessibility tests
* **style:** fix CSS variable naming

## [1.0.4](https://github.com/bitrix24/b24ui/compare/v1.0.3...v1.0.4) (2025-09-02)

### Features

* **useFormField:** export form errors injection key

### Bug Fixes

* **components:** broken types for `update:model-value` event
* **Form:** update `Form` interface to accept RegExp
* **InputMenu/Select/SelectMenu:** show placeholder when model value is falsy
* **InputMenu:** prevent `focus-outside` event on content

## [1.0.3](https://github.com/bitrix24/b24ui/compare/v1.0.2...v1.0.3) (2025-08-26)

### Bug Fixes
* **SidebarLayout**: for mode `useLightContent` set new padding, restore `containerWrapper` context `light`

## [1.0.2](https://github.com/bitrix24/b24ui/compare/v1.0.1...v1.0.2) (2025-08-25)

### Bug Fixes
* **SidebarLayout**: color for `loadingIcon` for `edge-dark` context when using `useLightContent`

### Features
* **Slideover**: add b24ui `sidebarLayoutLoadingWrapper` and `sidebarLayoutLoadingIcon`

## [1.0.1](https://github.com/bitrix24/b24ui/compare/v0.7.2...v1.0.1) (2025-08-20)

### AirWeb
* **TableWrapper** fix `color`
* **ProseHr\ProseUl\ProseOl\ProseA\ProseBlockquote** fix color
* **ProseP** fix `color`, add prop `small`, add prop accent `{default, accent, accent-more, less, less-more}`
* **ProseH*** fix `color`, add prop `accent` `{default, accent, accent-more, less, less-more}`
* **ProseH1\ProseH2\ProseH3\ProseH4\ProseH5\ProseH6** fix color, add prop accent `{default, accent, accent-more, less, less-more}`
* **ProseCode** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **ProseCode** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **NavbarDivider\SidebarHeading** fix `color`
* **Popover** fix `color`, `arrow`
* **DropdownMenu** fix color, `arrow`, remove `size`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **NavigationMenu** fix `hint`, `delayDuration`, remove `contentOrientation`, `highlight`, `highlightColor`, `arrow`, `color`, `variant.link`
* **StackedLayout** remove, use SidebarLayout
* **SidebarLayout** add slots `content-top`, `content-actions`, `loading`, add prop `inner`, `offContentScrollbar` 
* **useSidebarLayout** add composable 
* **Button** prop `normal-case` now `true`, new size `{xl, lg, md, sm, xs, xss}`, deprecate prop `depth`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-secondary-no-accent, air-tertiary, air-tertiary-accent, air-tertiary-no-accent, air-selection, air-boost}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai, link}`
* **Separator** add type `double`, remove prop `color`, add prop `accent` `{default, accent, less}`, prop `size` `{thin, thick}`
* **Skeleton** add prop `accent` `{default, accent, less}`
* **Slideover** remove prop `scrollbarThin`, prop `side` now `bottom`, calc size from `max-w-*`, use `SidebarLayout` for render content
* **Modal** fix `color`, add slot `contentWrapper`
* **Kbd** fix `arrow`, fix `color`, remove `depth`, add prop `accent` `{default, accent, less}`
* **Tooltip** fix `arrow`, fix `color`, remove `kbdsDepth`, add prop `kbdsAccent` from `Kbd`
* **Toast** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Alert** fix `color`, add prop `inverted`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-tertiary}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Container** fix `size`
* **Accordion** fix `color`
* **Advice** fix `color`, remove empty `Avatar`
* **Chip** fix `color`, add prop `hideZero`, add prop `trailingIcon`, add prop `inverted`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-accent, air-secondary-accent-1, air-tertiary}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`, deprecate `size` `{3xs, 2xs, xs, xl, 2xl, 3xl}`
* **Badge** fix `color`, add prop `inverted`, remove `depth`, remove `useFill` now use `inverted`, new `size` `{xss, xs, sm, md, lg, xl}`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary, air-secondary-alert, air-secondary-accent, air-secondary-accent-1, air-secondary-accent-2, air-tertiary, air-selection}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Switch** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Checkbox** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **RadioGroup** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Progress** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning, air-secondary}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Range** fix `color`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Calendar** fix `color`, off `yearControls`, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **DescriptionList** fix `color`
* **Input\InputNumber\Textarea** fix `color`, fix `size`, use `Badge` as tag, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **Select\SelectMenu\InputMenu** fix `color`, fix `size`, fix dropdown height, use `Badge` as tag, new `color` `{air-primary, air-primary-success, air-primary-alert, air-primary-copilot, air-primary-warning}`, deprecate `color` `{default, danger, success, warning, primary, secondary, collab, ai}`
* **From\FormField** fix `color`, fix `size`
* **Tabs** fix `color`, fix `size`, remove prop `color`, remove variant `pill`

### Features

* **Form:** support error RegExp in exposed methods
* **useOverlay:** return promise on `open` method

### Bug Fixes

* **Input:** incorrect rendering of type `date` / `time` on iOS
* **InputMenu/Select/SelectMenu:** add display value fallback when no items found
* **Select/InputMenu:** handle focus via label inside a FormField
* **Tabs:** add missing Badge import
* **Toast:** add type for progress `ui` prop
* **Tooltip:** render only if `text` or `kbds` are present
* **Link** ensure target `_blank` is flagged as external for Inertia and Vue
* **Form** default slot types

## [0.7.2](https://github.com/bitrix24/b24ui/compare/v0.7.1...v0.7.2) (2025-07-14)

### Bug Fixes

* **Prose/Em:** improve types

## [0.7.1](https://github.com/bitrix24/b24ui/compare/v0.7.0...v0.7.1) (2025-07-13)

### Bug Fixes

* **Slideover/Modal:** dialogContent class

### Features

* **AirWeb:** start work with new theme

## [0.7.0](https://github.com/bitrix24/b24ui/compare/v0.6.9...v0.7.0) (2025-07-01)

### ⚠ BREAKING CHANGES

* **components:** `class` should have priority over `ui` prop
* **NavigationMenu:** revert new `collapsible` field
* **InputMenu/Select/SelectMenu:** manual viewport to display scrollbars
* **useOverlay:** correct spelling of `unmount` function

### Features

* **components:** add `b24ui` field in items
* **useOverlay:** add `closeAll` method
* **useOverlay:** add `isOpen` method to check overlay state
* **NavigationMenu:** handle `tooltip` in items
* **NavigationMenu:** add `collapsible` field in items
* **NavigationMenu:** handle `vertical` orientation with Accordion instead of Collapsible
* **NavigationMenu:** add `tooltip` and `popover` props
* **NavigationMenu:** add `trigger` type in items
* **Modal/Slideover:** add `after:enter` event
* **Modal/Slideover:** add `close` method in slots
* **Modal/Slideover:** add `actions` slot
* **Popover:** add `anchor` slot
* **Toast:** add `progress` prop to hide progress bar
* **Select/SelectMenu:** handle dynamic `autofocus`
* **Select/SelectMenu/Tabs:** expose trigger refs
* **Badge:** add `square` prop
* **Avatar:** add `chip` prop
* **Form:** expose loading state to default slot
* **InputNumber:** add `increment-disabled` / `decrement-disabled` props
* **extendLocale:** new composable
* **Accordion:** new component
* **Tooltip:** add `reference` prop
* **Input/Textarea:** add `default-value` prop

### Bug Fixes

* **defineShortcuts:** bring back `meta` to `ctrl` convert on non macros platforms
* **RadioGroup:** improve items `value` field type
* **useOverlay:** improve types and docs
* **templates:** put back args to watch in dev
* **templates:** dont write unused variants in theme files
* **Calendar:** add `place-items-center` to grid row
* **theme:** improve app config types for `b24ui` object
* **inertia|vue:** link always render as anchor tag
* **Tabs:** prevent trigger truncate without parent width
* **Tabs:** set `focus:outline-none` with `link` variant
* **Badge/Button:** handle zero value in label correctly
* **Select:** support more primitive types in `value` field
* **Toaster:** allow `base` slot override
* **vue:** make `useAppConfig` reactive
* **inertia:** make `useAppConfig` reactive
* **NavigationMenu:** arrow position conflict
* **Link:** consistent behavior between nuxt, vue and inertia
* **Input/Textarea:** handle generic types
* **Range:** handle generic types
* **FormField:** use `div` for `error` and `help` slots
* **module:** configure fix
* **FormField:** block form field injection after use
* **Checkbox/RadioGroup:** render correct element without `variant`
* **InputNumber:** handle inside button group
* **ButtonGroup:** add `z-index` on focused element
* **NavigationMenu:** incorrect hover when disabled and active
* **Tooltip:** increase padding for consistency
* **CheckboxGroup/RadioGroup:** variant `table` borders in RTL mode
* **Input/Textarea:** define model modifiers types
* **DropdownMenu:** wrap groups in a viewport
* **NavigationMenu:** set content `max-height` in `horizontal` orientation
* **Select/SelectMenu:** display falsy values
* **Select/SelectMenu:** prevent empty string display when multiple
* **Form:** conditionally type form data via `transform` prop
* **Toast:** calc height on next tick
* **useOverlay:** use original props when not provided to `open`
* **Modal/Slideover:** don't emit `close:prevent` on `closeAutoFocus`
* **defineShortcuts:** allow `meta_-` shortcut
* **useOverlay:** set props to original props when `defaultOpen` is set
* **NavigationMenu:** nested accordion context at every level
* **Toaster:** smoother visibility transition for stacked toasts
* **components:** remove default `md` size on buttons
* **Modal:** prevent scrollbars overflow
* **Form:** expose reactive fields
* **SelectMenu:** dynamic input size
* **use-overlay:** add caveats section regarding provide/inject limit
* **vue:** handle override when importing from `@nuxt/ui`
* **playground:** set ButtonGroup ps|pe for Button = color.link
* **NavigationMenu:** dark color for hover

### Docs 
* **input:** add mask example
* **installation:** add tip to improve types in vue
* **examples:** use `useClipboard` instead of `navigator.clipboard`

## [0.6.9](https://github.com/bitrix24/b24ui/compare/v0.6.8...v0.6.9) (2025-06-05)

### Docs

- **hero:** improve demo

## [0.6.8](https://github.com/bitrix24/b24ui/compare/v0.6.7...v0.6.8) (2025-06-04)

### Chore

* **deps:** update all non-major dependencies
* **tests:** improve
* **Calendar:** improve types

### Docs

* **form:** add example for external validate

## [0.6.7](https://github.com/bitrix24/b24ui/compare/v0.6.6...v0.6.7) (2025-04-24)

### Features

* **components:** add new `content-top` and `content-bottom` slots
* **Modal/Popover/Slideover:** add `close:prevent` event

### Bug Fixes

* **InputMenu/SelectMenu:** remove `valueKey` string case

### Docs

* **installation:** update instructions for inertia

### Chore

* **Skeleton:** remove `aria-busy:cursor-progress` class

## [0.6.6](https://github.com/bitrix24/b24ui/compare/v0.6.5...v0.6.6) (2025-04-23)

### Bug Fixes

* **usePortal:** adjust portal target resolution logic
* **Skeleton:** improve accessibility

### Docs

* **calendar:** add external controls example

## [0.6.5](https://github.com/bitrix24/b24ui/compare/v0.6.4...v0.6.5) (2025-04-22)

### Bug Fixes

* **App:** fix server side for `portal` prop

## [0.6.4](https://github.com/bitrix24/b24ui/compare/v0.6.3...v0.6.4) (2025-04-22)

### Features

* **Form:** add `attach` prop to opt-out of nested form attachement
* **App:** add global `portal` prop

### Bug Fixes

* **Form:** input and output type inference
* **Alert/Toast:** display actions when using slots

### Chore

* **deps:** update all non-major dependencies

## [0.6.3](https://github.com/bitrix24/b24ui/compare/v0.6.2...v0.6.3) (2025-04-18)

### Bug Fixes

* **Link:** proxy `download` property
* **components:** respect `transform-origin` in popper content
* **InputMenu/Select/SelectMenu:** add `min-w-fit` to `content` slot
* **vite:** vitest skipping nuxt imports transformations

### Docs

* **color-mode:** fix computed setter logic in `ColorModeButton.vue` example

## [0.6.2](https://github.com/bitrix24/b24ui/compare/v0.6.1...v0.6.2) (2025-04-16)

### Features

* **unplugin:** routing support for inertia

### Bug Fixes

* **Form:** loses focus on submit
* **types:** improve dynamic slots

### Chore

* **deps:** update all non-major dependencies
* **deps:** update tailwindcss to ^4.1.4

### Docs

* **form:** fix typo in expose section
* **installation:** improve `.vscode/settings.json` json

## [0.6.1](https://github.com/bitrix24/b24ui/compare/v0.6.0...v0.6.1) (2025-04-14)

### Features

* **Form:** export loading state
* **Tabs:** add `list-leading` and `list-trailing` slots
* **components:** refactor types after `@nuxt/module-builder` upgrade
* **types:** handle `ClassValue` in `b24ui` prop

### Chore

* run test suite on **windows**
* **deps:** update all non-major dependencies

## [0.6.0](https://github.com/bitrix24/b24ui/compare/v0.5.11...v0.6.0) (2025-04-10)

### ⚠ BREAKING CHANGES

* **deps:** update `@nuxt/module-builder`
* **OverlayProvider:** return an overlay instance from `.open()`

### Features

* **InputMenu/SelectMenu:** handle `resetSearchTermOnSelect`
* **Select:** handle `onSelect` field in items

### Bug Fixes
* **InputMenu/SelectMenu:** prevent `disabled` items to be selected

### Chore

* **deps:** update all non-major dependencies
* **package:** export utils, types

### Docs

* **form:** improve types

## [0.5.11](https://github.com/bitrix24/b24ui/compare/v0.5.10...v0.5.11) (2025-04-07)

### Bug Fixes

* **deps:** back `@nuxt/module-builder` v0.8.4

## [0.5.10](https://github.com/bitrix24/b24ui/compare/v0.5.9...v0.5.10) (2025-04-07)

### Bug Fixes

* **Popover:** arrow stroke at dark
* **InputMenu/SelectMenu:** support arbitrary `value`
* **NavigationMenu:** improve content slot

### Chore

* **NavigationMenu:** remove slots types in `createReusableTemplate`
* **module:** update metas
* **deps:** update `@nuxt/module-builder`
* **deps:** update all non-major dependencies

### Docs

* **radio-group:** items only accept strings or numbers

## [0.5.9](https://github.com/bitrix24/b24ui/compare/v0.5.8...v0.5.9) (2025-04-02)

### Features

* **Textarea:** add `autoresize-delay` prop
* **Textarea:** add `resize-none` class with `autoresize` prop
* **Textarea:** add `icon`, `loading`, etc. props to match Input

### Chore

* **Input/InputNumber/Textarea:** clean functions order
* **deps:** update nuxt framework to ^3.16.2

## [0.5.8](https://github.com/bitrix24/b24ui/compare/v0.5.7...v0.5.8) (2025-04-01)

### Features

* **InputNumber:** add support for `stepSnapping` & `disableWheelChange` props
* **RadioGroup:** add `card` and `table` variants

### Bug Fixes

* **InputMenu/SelectMenu:** correctly call `onSelect` events
* **InputMenu:** emit `change` on multiple item removal
* **DropdownMenu:** handle RTL mode

## [0.5.7](https://github.com/bitrix24/b24ui/compare/v0.5.6...v0.5.7) (2025-03-31)

### Bug Fixes

* **Avatar:** proxy `$attrs` to default slot
* **vue:** mock `nuxtApp.hooks` & `useRuntimeHook`
* **useOverlay:** refine `open` method type to infer close emit return type
* **DropdownMenuContent:** remove unwanted `any`

### Chore

* **layout:** add StackedLayout & SidebarLayout

### Docs

* **SidebarLayout/B24StackedLayout:** add demo link

## [0.5.6](https://github.com/bitrix24/b24ui/compare/v0.5.5...v0.5.6) (2025-03-28)

### Features

* **StackedLayout:** improve

### Bug Fixes

* InputMenu: reset `searchTerm` on `update:open`
* input:tag: improve

### Chore

* **SidebarLayout:** improve
* **playground:** improve
* **playground:** use StackedLayout

## 0.5.5 (2025-03-27)

### Bug Fixes

* **FormField:** add `help` to `aria-describedby` attribute
* **Form:** clear dirty state after submit

### Chore

* **deps:** update all non-major dependencies
* **NavigationMenu:** improve

### Docs

* **Collapsible:** improve

## 0.5.4 (2025-03-26)

### Features

* **Calendar:** allow year and month buttons styling

### Bug Fixes

* **Switch:** prevent transition on focus
* **Tabs:** remove `focus:outline-hidden` class
* **Button:** use `focus:outline-none` instead of `focus:outline-hidden`
* **NavigationMenu:** add `z-index` on viewport
* **Link:** properly pick all `aria-*` & `data-*` attrs
* **Link:** proxy `onClick`
* **Link:** prevent `active="true"` binding on html
* **Link:** handle `aria-current` like `NuxtLink` / `RouterLink`
* **components:** improve generic types
* **Container:** add `w-full` class

### Chore

* **defineLocale:** put back `@__NO_SIDE_EFFECTS__`
* **docs/playground:** add `vite.optimizeDeps
* **github:** improve module workflow
* **deps:** declare form validation libraries as `peerDependencies`
* **choredeps:** remove `typescript` resolution
* **deps:** add `zod`

### Docs

* **i18n:** remove `next` tag from `@nuxtjs/i18n` installation

## 0.5.3 (2025-03-24)

### Chore

* **deps:** move `@standard-schema/spec` to `dependencies`

### Docs

* **NavigationMenu:** improve

### Bug Fixes

* **defineLocale/defineShortcuts:** remove `@__NO_SIDE_EFFECTS__`

## 0.5.2 (2025-03-22)

### Chore

* **NavigationMenu:** improve

## 0.5.1 (2025-03-21)

### Features

* **components:** handle events in `content` prop

### Bug Fixes

* **Modal/Slideover/Toast:** prevent unnecessary close instantiation
* **module:** handle tailwindcss import without `theme(static)`
* **RadioGroup:** handle `disabled` on items

### Chore
* **deps:** update all non-major dependencies
* **deps:** update `vaul-vue`
* **deps:** update tailwindcss to ^4.0.15
* **NavigationMenu:** improve

## 0.5.0 (2025-03-20)

### ⚠ BREAKING CHANGES

* **Form:**** drop explicit support for `zod` and `valibot`

### Bug Fixes

* **DropdownMenu:** remove `any` from `proxySlots`

### Chore

* **Playground:** improve navigation
* **Form:** improve TSDoc
* **deps:** update nuxt framework to ^3.16.1
* **NavigationMenu:** improve
* **Navbar.../Sidebar...:** improve

## 0.4.11 (2025-03-19)

### Features

* **Collapsible:** add new component
* **NavigationMenu:** add new component

### Bug Fixes

* **useLocale**: unique symbol
* **module:** mark functions used in exports as pure

### Chore

* **components:** add eol in script tag to fix syntax highlight
* **SidebarLayout:** make auto close Slideover
* **Navbar.../Sidebar...:** improve tv

## 0.4.10 (2025-03-18)

### Docs

* **installation:** improve vscode recommendations

### Features

* **SidebarLayout:** new components (documentation is being prepared)

### Bug Fixes
* **vue:** missing unhead context
* **unplugin:** include `@compodium/examples` in auto-imports paths

### Chore

* **deps:** update
* **Demo/Playground/Playground-Vue:** use SidebarLayout

## 0.4.9 (2025-03-14)

### Docs

* **Prose:** add content and typography

### Chore

* **deps:** update

## 0.4.8 (2025-03-13)

### Features

* **Calendar:** new component

### Chore

* **deps:** update
* **Locales:** add iso `locale`

## 0.4.7 (2025-03-12)

### Features

* **Form:** global errors
* **Popover:** new component
* **Demo:** add prose page

### Bug Fixes

* **vue:** prevent calling `useHead` in colors

## 0.4.6 (2025-03-11)

### Features
* **useLocale:** handle generic messages
* **ProseTable:** add new prose

### Chore
* **deps:** update vueuse monorepo to v13
* **deps:** remove `happy-dom` resolution
* **deps:** update all non-major dependencies
* **deps:** add `vue` / `vue-router` as dependencies
* **vitest:** improve config to ignore docs `.c12`

## 0.4.5 (2025-03-10)

### Features

* **Input/Textarea:** allow `null` value in model
* **ProseImg:** add new prose

### Bug Fixes

* **Button:** missing import
* **Form:** input blur validation on submit

### Chore

* **deps:** update tailwindcss to ^4.0.12
* **deps:** update all non-major dependencies
* **deps:** update dependency tailwind-variants to v1
* **deps:** update nuxt framework to ^3.16.0
* **deps:** update @unhead/vue to ^2.0.0-rc.9
* **LinkBase:** update types for `nuxt@3.16`

## 0.4.4 (2025-03-08)

### Features

* **i18n:** the list of localizations matches Bitrix24

### Docs
* **i18n:** add info for vue & nuxt

## 0.4.3 (2025-03-07)

### Chore

* **Avatar:** add props `style`
* **Prose:** improve
* **deps:** update all non-major dependencies

## 0.4.2 (2025-03-06)

### Features
* **Button:** handle `active` state
* **Modal/Slideover:** add props `overlayBlur`

### Chore
* **deps:** update tailwindcss to ^4.0.10

## 0.4.1 (2025-03-05)

### Bug Fixes

* **InputMenu:** wrong `required` in multiple mode
* **InputMenu/SelectMenu:** proxy `required` in root props

### Features

* **prose:** new prose components

### Chore

* **Slideover:** add safeList
* **components:** add `@IconComponent` tag on icon properties
* **components:** improve tsdoc
* **deps:** update dependency ohash to v2
* **Modal/Slideover:** add backdrop blur
* **DescriptionList:** move from `components/content` to `components`
* **TableWrapper:** move from `components/prose` to `components/content`

### Docs

* **getting-started:** improve

## 0.4.0 (2025-03-03)

### Bug Fixes

* **Button:** loader state
* **OverlayProvider:** fix types

### Features

* **package:** export `components` and `composables`

## 0.3.5 (2025-02-28)

### Bug Fixes

* **Toaster:** modal & toast
* **Button:** loader state

## 0.3.4 (2025-02-28)

### ⚠ BREAKING CHANGES

* **useOverlay:** handle programmatic modals and slideovers

### Features
* **Slideover:** new component

### Chore

* **vue:** stub `useColorMode`
* **vue:** auto import `useAppConfig`

## 0.3.3 (2025-02-27)

### Docs

* **ColorMode:** add info

### Chore

* **css:** source to root dir
* **vue:** add `useCookie` stub
* **vue:** export `defineShortcuts` & `useLocale` & `useConfetti` composables

### Bug Fixes

* **Link:** improve external links handling in vue

## 0.3.2 (2025-02-26)

### Features
* **useConfetti:** add composable to programmatically control `canvas-confetti`

### Docs
* **install:** improve info

### Chore
* **tailwindcss/vite:** improve source

## 0.3.1 (2025-02-25)

### Features
* **Modal:** add `scrollbarThin` prop

### Bug Fixes
* **FormFields:** required label dark class
* **Toaster:** add def position
* **Button:** loader size
* **Modal:** header min-height

### Docs
* **InputMenu:** improve

### Chore
* **deps:** update
* **docs:** improve app
* **demo:** improve
* **Form:** improve example

## 0.3.0 (2025-02-24)

### ⚠ BREAKING CHANGES

* **tailwindcss/vite:** improve for tailwindcss/vite v4.0.8

### Features
* **DropdownMenu/InputMenu/Select:** add item attr `color`

### Bug Fixes
* **components:** missing `$attrs` bind
* **Switch:** use with Tooltip

## 0.2.9 (2025-02-21)

### Features
* **Form:** add prop to disable state transformation
* **TableWrapper:** new component

### Docs
* **Installation:** improve
* **TableWrapper:** new component

### Bug Fixes
* **Tooltip:** bind `$attrs` on trigger
* **Form:** ensure loading state resets to false after an error
* **Modal:** disable close autofocus
* **Modal:** use `dvh` unit
* **Avatar:** render on SSR
* **vite:** exclude `@nuxt/ui` from vite pre-optimization
* **Modal:** fixed header height

### Chore
* **deps:** update `reka-ui` and `vaul-vue`
* **Toaster:** fix ts error

## 0.2.8 (2025-02-18)

### Docs

* **SelectMenu:** improve

### Bug Fixes

* **module:** use key when merging modules options
* **Badge:** improve show underline

### Chore
* **Avatar/Stepper:** fix types for `vue-tsc@2.2.0`
* **playground/playground-vue/demo:** move styles into `main.css`

## 0.2.7 (2025-02-17)

### Bug Fixes

* **Modal:** fix max-w

## 0.2.6 (2025-02-17)

### Features

* **DropdownMenu:** add `external-icon` prop
* **Link:** allow usage without `vue-router` in vue

### Docs

* **InputNumber:** improve
* **DropdownMenu:** improve

### Chore

* **demo:** make self workspace for demo

### Bug Fixes

* **InputMenu/Textarea:** add missing `PartialString` type on `b24ui` prop
* **Modal:** always fullscreen on mobile

## 0.2.5 (2025-02-12)

### Docs

* **Modal:** improve

### Chore

* **deps:** update
* **test-vue:** add content & prose folders

### Bug Fixes

* **SelectMenu:** wrap content with `FocusScope`
* **DescriptionList:** display description in the dark
* **RadioGroup:** make `RadioGroup.legend` eq `FormField.label`

## 0.2.4 (2025-02-11)

### Features

* **InputNumber:** new component

### Chore

* **module:** fix some style, test & etc

### Bug Fixes

* **Modal:** addPlugin

## 0.2.3 (2025-02-09)

### Features

* **Modal/ModalProvider/ModalDialogClose:** new component
* **useModal:** new composables

### Chore

* **css:** use new syntax for css variables

### Bug Fixes

* **Button:** px-0 for link color
* **Button/Checkbox/RadioGroup/Range/Switch:** focus-visible state

## 0.2.2 (2025-02-07)

### Features

* **module:** fake generate `tailwindcss` theme colors (for compatibility only)
* **DropdownMenu:** new component

## 0.2.1 (2025-02-06)

### Features

* **Alert/Toast/DescriptionList:** add `orientation` prop
* **Toast:** handle vnodes in `title` and `description`
* **useToast:** proxy emits
* **InputMenu:** new component

### Bug Fixes

* **Toast:** rename `click` to `onClick` for consistency
* **useToast:** don't return a promise on `add`

### Docs

* **Install:** improve
* **SelectMenu:** improve
* **InputMenu:** improve

## 0.1.7 (2025-02-05)

### Features

* **SelectMenu:** new component

### Bug Fixes

* **Button:** not render loaders if not loading
* **form:** import types from `@bitrix24/b24ui-nuxt`
* **App:** wrap `ModalProvider` / `SlideoverProvider` inside `TooltipProvider`

### Chore
* **types:** export `utils`
* **templates:** import from `@bitrix24/b24ui-nuxt`
* **package:** export `utils`

## 0.1.6 (2025-02-04)

### Features
* **Select:** improve
* **ButtonGroup:** improve split mode
* **Badge:** add support within button groups

### Bug Fixes

* **Link:** add import B24LinkBase

### Docs

* **Tooltip:** improve
* **Avatar:** improve

## 0.1.5 (2025-01-31)

### Features
* **unplugin:**  expose options for embedded plugins, throw warnings for duplication

### Bug Fixes

* **test-vue:** improve

### Docs

* **Toast:** improve
* **Progress:** improve

## 0.1.4 (2025-01-30)

### Docs
* **Advice:** improve
* **Chip:** improve

### Bug Fixes

* **Badge:** missing `B24Avatar` import
* **Toast|Alert:** if/else for Icons and Avatars
* **Select:** remove from useFormField deferInputValidation
* **theme:** Cast them slots types to string
* **Test:** improve

## 0.1.3 (2025-01-29)

### Bug Fixes

* **Tooltip:** bg-color

## 0.1.2 (2025-01-29)

### Bug Fixes

* **icon:** fixed typing of icons in components

## 0.1.1 (2025-01-28)

### Features
- components
  - Advice
  - Alert
  - App
  - Avatar
  - AvatarGroup
  - Badge
  - Button
  - ButtonGroup
  - Checkbox
  - Chip
  - Container
  - Countdown
  - Form
  - FormField
  - Input
  - Kbd
  - Link
  - LinkBase
  - Progress
  - RadioGroup
  - Range
  - Select
  - Separator
  - Skeleton
  - Switch
  - Tabs
  - Textarea
  - Toast
  - Toaster
  - Tooltip
- components::content
  - DescriptionList
- vue plugin
- playground
- docs
