import img from "../assets/tree.webp";

const Hero = () => {
  return (
    <div className="Hero">
      <div className="Container">
        <h1 className="Title">Welcome to live forum!</h1>
        <p className="text-content">
          Humans are social beings by nature, which means that we have a natural
          inclination to interact and form relationships with others.
          Socializing involves the process of engaging in social interactions,
          whether through communication, cooperation, or collaboration, to
          create and maintain social bonds and connections with others.
        </p>
        <img className="hero-img" src={img} alt="Tree" />
        <p className="text-content">
          Your grow start here. Enjoy your journey.
        </p>
      </div>
    </div>
  );
};

export default Hero;
