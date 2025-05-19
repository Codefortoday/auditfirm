import React, { useEffect,useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar"



const TaxCalculator = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const [income, setIncome] = useState("");
    const [tax, setTax] = useState(null);

    const calculateTax = () => {
        let incomeValue = parseFloat(income);
        let taxAmount = 0;

        if (incomeValue > 1500000) {
            taxAmount += (incomeValue - 1500000) * 0.30;
            incomeValue = 1500000;
        }
        if (incomeValue > 1200000) {
            taxAmount += (incomeValue - 1200000) * 0.20;
            incomeValue = 1200000;
        }
        if (incomeValue > 1000000) {
            taxAmount += (incomeValue - 1000000) * 0.15;
            incomeValue = 1000000;
        }
        if (incomeValue > 700000) {
            taxAmount += (incomeValue - 700000) * 0.10;
            incomeValue = 700000;
        }
        if (incomeValue > 300000) {
            taxAmount += (incomeValue - 300000) * 0.05;
        }

        setTax(taxAmount);
    };

    return (
        <>
        <Navbar/>
        <div className="container mt-5 p-4 border rounded shadow-sm bg-light text-center">
             {/* Budget 2025 Updates */}
      <h3 className="mb-3">Budget 2025 updates:</h3>
      <p>No income tax for income up to Rs. 12 Lakhs due to rebate of Rs. 60,000.</p>
      <br></br>
      <p>Modified slab rates for the new regime for FY 2025-26 (AY 2026-27):</p>
     

      {/* Tax Slab Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-primary text-center">
            <tr>
              <th>Income Tax Slabs</th>
              <th>Tax Rate</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>Up to Rs. 4,00,000</td>
              <td>NIL</td>
            </tr>
            <tr>
              <td>Rs. 4,00,001 - Rs. 8,00,000</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>Rs. 8,00,001 - Rs. 12,00,000</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>Rs. 12,00,001 - Rs. 16,00,000</td>
              <td>15%</td>
            </tr>
            <tr>
              <td>Rs. 16,00,001 - Rs. 20,00,000</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>Rs. 20,00,001 - Rs. 24,00,000</td>
              <td>25%</td>
            </tr>
            <tr>
              <td>Above Rs. 24,00,000</td>
              <td>30%</td>
            </tr>
          </tbody>
        </table>
      </div>
            <h3 className="mb-3">Income Tax Calculator (FY 2024-25)</h3>
            <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter your income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
            />
            <button className="btn btn-primary mb-3" onClick={calculateTax}>Calculate Tax</button>
            
            {tax !== null && (
                <h5 className="mt-3 text-success">Estimated Tax: ₹{tax.toFixed(2)}</h5>
            )}
            

<h3 className="mt-5">Got Question?</h3>

<div className="accordion" id="faqAccordion">

  {/* Question 1 */}
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
        Why I am getting Tax value to pay even if my income is below 12 Lakhs??
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div className="accordion-body">
        According to new Tax Slabs only single income is excempted in 12 Lakn regime other incomes are Taxable
      </div>
    </div>
  </div>

  {/* Question 2 */}
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
        So, How do you ensure accurate tax planning?
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div className="accordion-body">
        Our tax experts stay updated with the latest national and global tax regulations to ensure compliance and maximum tax benefits for you.
      </div>
    </div>
  </div>

  {/* Question 3 */}
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
        Getting a Ton of tax value??
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div className="accordion-body">
        Dont worry we provide tailored GST and advance tax planning services to ensure smooth tax filings and compliance.
      </div>
    </div>
  </div>

  {/* Question 4 */}
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingFour">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
        Can I get rid of all Tax that is Payable??
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div className="accordion-body">
       Yes, But to a certain level. We will ensure that proper Tax Deductions are consider and your Hardearn money is safe.
      </div>
    </div>
  </div>

  {/* Question 5 */}
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingFive">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
        So, what are the next steps 🪜?
      </button>
    </h2>
    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div className="accordion-body">
        Nothing just Book a tax consultation with us today! Then we got you coverd 👍.
      </div>
    </div>
  </div>

</div>
            <p className="mt-4 text-muted">Don't get confused! Pay your taxes & file returns with us.</p>
            <a href="/Appointment" className="btn btn-success mx-2">Book Appointment</a>
            <a href="/contact" className="btn btn-warning mx-2">Contact Us</a>
        </div>
        </>
    );
};

export default TaxCalculator;




// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const TaxCalculator = () => {
//     const [income, setIncome] = useState("");
//     const [deductions, setDeductions] = useState("");
//     const [regime, setRegime] = useState("old");
//     const [tax, setTax] = useState(null);

//     const calculateTax = () => {
//         let taxableIncome = regime === "old" ? income - deductions : income;
//         let taxAmount = 0;

//         if (taxableIncome <= 250000) {
//             taxAmount = 0;
//         } else if (taxableIncome <= 500000) {
//             taxAmount = (taxableIncome - 250000) * 0.05;
//         } else if (taxableIncome <= 1000000) {
//             taxAmount = 12500 + (taxableIncome - 500000) * 0.2;
//         } else {
//             taxAmount = 112500 + (taxableIncome - 1000000) * 0.3;
//         }

//         setTax(taxAmount);
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Income Tax Calculator</h2>
//             <div className="mb-3">
//                 <label className="form-label">Annual Income (₹)</label>
//                 <input
//                     type="number"
//                     className="form-control"
//                     value={income}
//                     onChange={(e) => setIncome(Number(e.target.value))}
//                     placeholder="Enter your income"
//                 />
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Deductions (₹)</label>
//                 <input
//                     type="number"
//                     className="form-control"
//                     value={deductions}
//                     onChange={(e) => setDeductions(Number(e.target.value))}
//                     placeholder="Enter deductions (80C, etc.)"
//                 />
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">Select Tax Regime</label><br />
//                 <input
//                     type="radio"
//                     name="regime"
//                     value="old"
//                     checked={regime === "old"}
//                     onChange={() => setRegime("old")}
//                 /> Old Regime
//                 <input
//                     type="radio"
//                     name="regime"
//                     value="new"
//                     checked={regime === "new"}
//                     onChange={() => setRegime("new")}
//                     className="ms-3"
//                 /> New Regime
//             </div>
//             <button className="btn btn-primary w-100" onClick={calculateTax}>Calculate Tax</button>
//             {tax !== null && (
//                 <h3 className="mt-4 text-center">Estimated Tax Payable: ₹{tax.toFixed(2)}</h3>
//             )}
//         </div>
//     );
// };

// export default TaxCalculator;
