<template>
  <ProseTable
    :zebra="false"
  >
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
</template>
