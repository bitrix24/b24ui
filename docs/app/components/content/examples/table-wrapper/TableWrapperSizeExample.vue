<template>
  <B24TableWrapper
    class="overflow-x-auto w-full"
    size="xs"
  >
    <table>
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Company</th>
          <th>Deal Stage</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr>
          <th>1</th>
          <td>Tech Innovators Inc.</td>
          <td>Proposal Sent</td>
          <td>50,000</td>
        </tr>
        <!-- row 2 -->
        <tr>
          <th>2</th>
          <td>Global Solutions Ltd.</td>
          <td>Negotiation</td>
          <td>120,000</td>
        </tr>
        <!-- row 3 -->
        <tr>
          <th>3</th>
          <td>Future Enterprises</td>
          <td>Contract Signed</td>
          <td>200,000</td>
        </tr>
        <!-- row 4 -->
        <tr>
          <th>4</th>
          <td>Bright Ideas Co.</td>
          <td>Initial Contact</td>
          <td>15,000</td>
        </tr>
        <!-- row 5 -->
        <tr>
          <th>5</th>
          <td>NextGen Technologies</td>
          <td>Closing</td>
          <td>300,000</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3" class="text-right">
            Total:
          </th>
          <td>
            685,00
          </td>
        </tr>
      </tfoot>
    </table>
  </B24TableWrapper>
</template>
