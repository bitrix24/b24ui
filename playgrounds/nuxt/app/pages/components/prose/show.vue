<script setup lang="ts">
import ExampleGrid from '../../../components/ExampleGrid.vue'
import ExampleCard from '../../../components/ExampleCard.vue'
// import ExampleCardSubTitle from '../../../components/ExampleCardSubTitle.vue'

const demoPreText = `
| Analytics:| Data:    | Sample:    |
|-----------|----------|------------|
| Month     | Visitors | Conversion |
| January   | 15,234   | 2.3%       |
| February  | 28,901   | 3.1%       |

`
const demoPreObj = [
  [
    'Analytics',
    'Data',
    'Sample'
  ],
  [
    'Month',
    'Visitors',
    'Conversion %'
  ],
  [
    'January',
    15234,
    2.3
  ],
  [
    'February',
    28901,
    3.1
  ]
]
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="simple" class="col-span-4">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <ProseH1>Welcome to "Sales Peak" Agency</ProseH1>
        <ProseH2>Your Growth Is Our Profession</ProseH2>

        <ProseP>We are the <ProseStrong>industry leaders</ProseStrong> in digital marketing since 2010. Our team helps businesses increase sales using <ProseEm>cutting-edge technologies</ProseEm> and proven methodologies.</ProseP>
        <ProseP small>We are the <ProseStrong>industry leaders</ProseStrong> in digital marketing since 2010. Our team helps businesses increase sales using <ProseEm>cutting-edge technologies</ProseEm> and proven methodologies.</ProseP>
        <ProseP accent="accent">We are the <ProseStrong>industry leaders</ProseStrong> in digital marketing since 2010. Our team helps businesses increase sales using <ProseEm>cutting-edge technologies</ProseEm> and proven methodologies.</ProseP>
        <ProseP accent="accent-more">We are the <ProseStrong>industry leaders</ProseStrong> in digital marketing since 2010. Our team helps businesses increase sales using <ProseEm>cutting-edge technologies</ProseEm> and proven methodologies.</ProseP>
        <ProseP accent="less">We are the <ProseStrong>industry leaders</ProseStrong> in digital marketing since 2010. Our team helps businesses increase sales using <ProseEm>cutting-edge technologies</ProseEm> and proven methodologies.</ProseP>
        <ProseP accent="less-more">We are the <ProseStrong>industry leaders</ProseStrong> in digital marketing since 2010. Our team helps businesses increase sales using <ProseEm>cutting-edge technologies</ProseEm> and proven methodologies.</ProseP>

        <ProseBlockquote>
          "Working with this agency boosted our revenue by 300% in six months!"<br>
          - TechProduct LLC
        </ProseBlockquote>

        <ProseHr />

        <ProseH3 id="coreServices">
          Our Core Services
        </ProseH3>
        <ProseUl>
          <ProseLi>PPC Advertising</ProseLi>
          <ProseLi>SEO Optimization</ProseLi>
          <ProseLi>SMM Promotion</ProseLi>
          <ProseLi>Conversion-focused Website Development</ProseLi>
          <ProseLi>Email Marketing</ProseLi>
          <ProseLi>Analytics & Big Data</ProseLi>
        </ProseUl>

        <ProseH4>Workflow Stages:</ProseH4>
        <ProseOl>
          <ProseLi>Business Audit</ProseLi>
          <ProseLi>Strategy Development</ProseLi>
          <ProseLi>Implementation</ProseLi>
          <ProseLi>Testing</ProseLi>
          <ProseLi>Launch</ProseLi>
          <ProseLi>Ongoing Support</ProseLi>
        </ProseOl>

        <ProseH5>Comprehensive Solutions:</ProseH5>
        <ProseUl>
          <ProseLi>
            Startup Package
            <ProseOl>
              <ProseLi>Landing Page</ProseLi>
              <ProseLi>Google Ads Setup</ProseLi>
              <ProseLi>Basic SEO</ProseLi>
              <ProseLi>Monthly Reporting</ProseLi>
            </ProseOl>
          </ProseLi>
          <ProseLi>...</ProseLi>
        </ProseUl>

        <ProsePre>
          {{ demoPreText }}
        </ProsePre>

        <ProseP>
          For API integration use <ProseCode>client.getSalesData(date_from, date_to)</ProseCode> and see
          <ProseCode color="collab">Docs</ProseCode>
        </ProseP>

        <ProseHr />

        <ProseH6>Our Advantages</ProseH6>
        <ProseTable>
          <ProseThead>
            <ProseTr>
              <ProseTh>Metric</ProseTh>
              <ProseTh>Result</ProseTh>
              <ProseTh>Guarantee</ProseTh>
            </ProseTr>
          </ProseThead>
          <ProseTbody>
            <ProseTr>
              <ProseTd>Traffic Growth</ProseTd>
              <ProseTd>+150%</ProseTd>
              <ProseTd>6 months</ProseTd>
            </ProseTr>
            <ProseTr>
              <ProseTd>Conversion Increase</ProseTd>
              <ProseTd>
                <ProseUl>
                  <ProseLi>PPC Advertising</ProseLi>
                  <ProseLi>SEO Optimization</ProseLi>
                  <ProseLi>SMM Promotion</ProseLi>
                  <ProseLi>Conversion-focused Website Development</ProseLi>
                  <ProseLi>Email Marketing</ProseLi>
                  <ProseLi>Analytics & Big Data</ProseLi>
                </ProseUl>
              </ProseTd>
              <ProseTd>1 year</ProseTd>
            </ProseTr>
            <ProseTr>
              <ProseTd><ProseCode>ROI</ProseCode></ProseTd>
              <ProseTd>
                <ProseOl>
                  <ProseLi>Landing Page</ProseLi>
                  <ProseLi>Google Ads Setup</ProseLi>
                  <ProseLi>Basic SEO</ProseLi>
                  <ProseLi>Monthly Reporting</ProseLi>
                </ProseOl>
              </ProseTd>
              <ProseTd>
                <ProseP>
                  For API integration see <ProseCode color="collab">Docs</ProseCode>
                </ProseP>
              </ProseTd>
            </ProseTr>
          </ProseTbody>
        </ProseTable>

        <div class="flex flex-col items-center justify-center gap-[5px]">
          <div class="w-[200px] mx-auto">
            <ProseImg
              src="https://www.bitrix24.com/images/content_en/images/head/b24rich_new.png"
              alt="Sales growth chart"
            />
          </div>

          <div class="w-[200px] mx-auto">
            <ProseImg
              src="/bg/edge-dark-v1.jpg"
              alt="Sales growth chart"
            />
          </div>

          <ProseImg
            class="mx-auto"
            src="https://www.bitrix24.com/images/content_en/images/head/b24rich_new.png"
            alt="Sales growth chart"
            :zoom="false"
            width="400px"
          />
        </div>

        <ProseP>
          Contact us via <ProseA href="tel:+1234567890">phone</ProseA> or through our
          <ProseA href="#coreServices">contact form</ProseA> or see our <ProseA href="#coreServices"><ProseCode color="ai">Core Services</ProseCode></ProseA>. Follow our <ProseEm>Telegram channel</ProseEm> for expert tips!
        </ProseP>

        <ProseOl>
          <ProseLi>
            Additional Services
            <ProseUl>
              <ProseLi>Copywriting</ProseLi>
              <ProseLi>Design</ProseLi>
              <ProseLi>Video Production</ProseLi>
              <ProseLi>PR Management</ProseLi>
            </ProseUl>
          </ProseLi>
          <ProseLi>...</ProseLi>
        </ProseOl>

        <ProsePre>
          {{ demoPreObj }}
        </ProsePre>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
