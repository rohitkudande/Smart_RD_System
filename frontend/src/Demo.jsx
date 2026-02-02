import heroBg from "./assets/img1.jpg";

export default function Demo() {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      {/* White transparent overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)"
        }}
      ></div>

      {/* Content */}
      <div className="container position-relative py-5">
        <h2 className="fw-bold mb-4 text-center text-primary">
          RD Rules & Regulations
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-8">
           <ul className="fs-5 bg-white shadow rounded p-4">
  <li className="mb-2">
    RD account minimum tenure is <strong>12 months</strong>
  </li>
  <li className="mb-2">
    Monthly installment must be paid <strong>before due date</strong>
  </li>
  <li className="mb-2">
    Late payment attracts <strong>fine as per bank policy</strong>
  </li>
  <li className="mb-2">
    Premature closure allowed after <strong>minimum lock-in period</strong>
  </li>
  <li className="mb-2">
    Interest is <strong>calculated monthly</strong>
  </li>
  <li>
    Passbook entries are <strong>maintained digitally</strong>
  </li>
</ul>

          </div>
        </div>
      </div>
    </div>
  );
}
