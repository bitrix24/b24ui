<template>
  <B24TableWrapper
    class="overflow-x-auto w-full h-[400px]"
    size="xs"
    pin-cols
    pin-rows
    row-hover
  >
    <table>
      <colgroup>
        <col>
        <col style="min-width: 200px">
        <col>
        <col>
        <col>
        <col>
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th />
          <td>Deal Name</td>
          <td>Company</td>
          <td>Deal Stage</td>
          <td>Amount</td>
          <td>Assigned To</td>
          <td>Start Date</td>
          <td>Notes</td>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>Tech Upgrade Project</td>
          <td>Tech Innovators Inc.</td>
          <td>Proposal Sent</td>
          <td>150,000</td>
          <td>John Doe</td>
          <td>01/15/2023</td>
          <td>Waiting for feedback</td>
          <th>1</th>
        </tr>
        <tr>
          <th>2</th>
          <td>Global Expansion Plan</td>
          <td>Global Solutions Ltd.</td>
          <td>Negotiation</td>
          <td>500,000</td>
          <td>Jane Smith</td>
          <td>02/10/2023</td>
          <td>Key decision maker</td>
          <th>2</th>
        </tr>
        <tr>
          <th>3</th>
          <td>New Product Launch</td>
          <td>Future Enterprises</td>
          <td>Contract Signed</td>
          <td>300,000</td>
          <td>Michael Brown</td>
          <td>03/05/2023</td>
          <td>Delivery in progress</td>
          <th>3</th>
        </tr>
        <tr>
          <th>4</th>
          <td>Marketing Campaign</td>
          <td>Bright Ideas Co.</td>
          <td>Initial Contact</td>
          <td>75,000</td>
          <td>Emily Davis</td>
          <td>04/20/2023</td>
          <td>Budget approved</td>
          <th>4</th>
        </tr>
        <tr>
          <th>5</th>
          <td>IT Infrastructure Deal</td>
          <td>NextGen Technologies</td>
          <td>Closing</td>
          <td>1,000,000</td>
          <td>David Wilson</td>
          <td>05/12/2023</td>
          <td>Finalizing details</td>
          <th>5</th>
        </tr>
        <tr>
          <th>6</th>
          <td>HR Software Implementation</td>
          <td>People First Inc.</td>
          <td>Proposal Sent</td>
          <td>200,000</td>
          <td>Sophi Biles</td>
          <td>06/01/2023</td>
          <td>Awaiting approval</td>
          <th>6</th>
        </tr>
        <tr>
          <th>7</th>
          <td>Logistics Optimization</td>
          <td>Logistics Pro</td>
          <td>Negotiation</td>
          <td>450,000</td>
          <td>Reid Semiras</td>
          <td>07/18/2023</td>
          <td>Discussing terms</td>
          <th>7</th>
        </tr>
        <tr>
          <th>8</th>
          <td>Sales Training Program</td>
          <td>Global Sales Ltd.</td>
          <td>Contract Signed</td>
          <td>120,000</td>
          <td>Alec Lethby</td>
          <td>08/22/2023</td>
          <td>Training scheduled</td>
          <th>8</th>
        </tr>
        <tr>
          <th>9</th>
          <td>Product Redesign</td>
          <td>Innovate Corp.</td>
          <td>Initial Contact</td>
          <td>90,000</td>
          <td>Florida Garces</td>
          <td>09/05/2023</td>
          <td>Initial discussions</td>
          <th>9</th>
        </tr>
        <tr>
          <th>10</th>
          <td>Cloud Migration</td>
          <td>Tech Solutions Inc.</td>
          <td>Closing</td>
          <td>600,000</td>
          <td>Maribeth Popping</td>
          <td>10/10/2023</td>
          <td>Final review</td>
          <th>10</th>
        </tr>
        <tr>
          <th>11</th>
          <td>Customer Support Upgrade</td>
          <td>Zemlak, Daniel and Leannon</td>
          <td>Proposal Sent</td>
          <td>85,000</td>
          <td>Hart Hagerty</td>
          <td>11/15/2023</td>
          <td>Pending approval</td>
          <th>11</th>
        </tr>
        <tr>
          <th>12</th>
          <td>Financial Audit</td>
          <td>Carroll Group</td>
          <td>Negotiation</td>
          <td>250,000</td>
          <td>Brice Swyre</td>
          <td>12/01/2023</td>
          <td>Scope finalized</td>
          <th>12</th>
        </tr>
        <tr>
          <th>13</th>
          <td>Office Renovation</td>
          <td>Rowe-Schoen</td>
          <td>Contract Signed</td>
          <td>180,000</td>
          <td>Marjy Ferencz</td>
          <td>01/10/2024</td>
          <td>Work in progress</td>
          <th>13</th>
        </tr>
        <tr>
          <th>14</th>
          <td>Cybersecurity Upgrade</td>
          <td>Wyman-Ledner</td>
          <td>Initial Contact</td>
          <td>300,000</td>
          <td>Yancy Tear</td>
          <td>02/05/2024</td>
          <td>Initial assessment</td>
          <th>14</th>
        </tr>
        <tr>
          <th>15</th>
          <td>Employee Wellness Program</td>
          <td>Schuster-Schimmel</td>
          <td>Closing</td>
          <td>95,000</td>
          <td>Meghann Durtnal</td>
          <td>03/12/2024</td>
          <td>Finalizing details</td>
          <th>15</th>
        </tr>
        <tr>
          <th>16</th>
          <td>Data Analytics Project</td>
          <td>Wiza, Bins and Emard</td>
          <td>Proposal Sent</td>
          <td>220,000</td>
          <td>Irma Vasilik</td>
          <td>04/18/2024</td>
          <td>Awaiting feedback</td>
          <th>16</th>
        </tr>
        <tr>
          <th>17</th>
          <td>E-commerce Platform</td>
          <td>O'Hara, Welch and Keebler</td>
          <td>Negotiation</td>
          <td>700,000</td>
          <td>Sammy Seston</td>
          <td>05/22/2024</td>
          <td>Key terms discussed</td>
          <th>17</th>
        </tr>
        <tr>
          <th>18</th>
          <td>AI Integration</td>
          <td>Turner-Kuhlman</td>
          <td>Contract Signed</td>
          <td>1,200,000</td>
          <td>Lesya Tinham</td>
          <td>06/30/2024</td>
          <td>Implementation started</td>
          <th>18</th>
        </tr>
        <tr>
          <th>19</th>
          <td>Supply Chain Optimization</td>
          <td>Kshlerin, Rogahn and Swaniawski</td>
          <td>Initial Contact</td>
          <td>400,000</td>
          <td>Aland Wilber</td>
          <td>07/15/2024</td>
          <td>Initial discussions</td>
          <th>19</th>
        </tr>
        <tr>
          <th>20</th>
          <td>Product Launch Event</td>
          <td>Sauer LLC</td>
          <td>Closing</td>
          <td>150,000</td>
          <td>Zaneta Tewkesbury</td>
          <td>08/20/2024</td>
          <td>Final preparations</td>
          <th>20</th>
        </tr>
        <tr>
          <th>21</th>
          <td>Mobile App Development</td>
          <td>Hilpert Group</td>
          <td>Proposal Sent</td>
          <td>350,000</td>
          <td>Andy Tipple</td>
          <td>09/25/2024</td>
          <td>Awaiting approval</td>
          <th>21</th>
        </tr>
        <tr>
          <th>22</th>
          <td>Customer Loyalty Program</td>
          <td>Gutmann Inc</td>
          <td>Negotiation</td>
          <td>120,000</td>
          <td>Sophi Biles</td>
          <td>10/10/2024</td>
          <td>Terms under review</td>
          <th>22</th>
        </tr>
        <tr>
          <th>23</th>
          <td>ERP System Implementation</td>
          <td>Gaylord, Pacocha and Baumbach</td>
          <td>Contract Signed</td>
          <td>900,000</td>
          <td>Florida Garces</td>
          <td>11/15/2024</td>
          <td>Project kickoff</td>
          <th>23</th>
        </tr>
        <tr>
          <th>24</th>
          <td>Digital Marketing Campaign</td>
          <td>Deckow-Pouros</td>
          <td>Initial Contact</td>
          <td>200,000</td>
          <td>Maribeth Popping</td>
          <td>12/20/2024</td>
          <td>Initial discussions</td>
          <th>24</th>
        </tr>
        <tr>
          <th>25</th>
          <td>Warehouse Automation</td>
          <td>Schiller, Cole and Hackett</td>
          <td>Closing</td>
          <td>1,500,000</td>
          <td>Moritz Dryburgh</td>
          <td>01/05/2025</td>
          <td>Finalizing details</td>
          <th>25</th>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th />
          <td>Deal Name</td>
          <td>Company</td>
          <td>Deal Stage</td>
          <td>Amount</td>
          <td>Assigned To</td>
          <td>Start Date</td>
          <td>Notes</td>
          <th />
        </tr>
      </tfoot>
    </table>
  </B24TableWrapper>
</template>
