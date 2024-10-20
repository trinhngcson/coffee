const Hero = () => {
  return (
    <>
      <h1>
        Caffeince Tracking for Coffee{" "}
        <abbr title="An enthusiast or devotee">Friends</abbr>!
      </h1>
      <div className="benefits-list">
        <h3 className="font-bolder">
          Try <span className="text-gradient">Coffee</span> and start...
        </h3>
        <p>
          <i className="fa-solid fa-circle-check" /> Tracking ever coffee
        </p>
        <p>
          <i className="fa-solid fa-circle-check" /> Measuring ur blood caffeine
          levels
        </p>
        <p>
          <i className="fa-solid fa-circle-check" /> Costing and quantifying ur
          additions
        </p>
      </div>
      <div className="card info-card">
        <div>
          <i className="fa-solid fa-circle-info" />
          <h3>Did you know...</h3>
        </div>
        <h5>That caffeine&apos;s half-life is about 5 hours?</h5>
        <p>
          This means that after 5 hours. half the caffeince you consumed is
          still in ur system, keeping u alert longer! So if u drink a cup of
          coffee with 200mg of , 5 hours, later, u&apos;ll still have about
          100mg of caffeine in you system.
        </p>
      </div>
    </>
  );
};

export default Hero;
