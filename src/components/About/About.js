import meImg from '../../images/me.jpg';
const About = () => {
  return (
    <section className="about">
      <img className="about__image" src={meImg} alt="Daniel mlaka" />
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p>Hello</p>
        <p>Daniel malka is in the Web I'm a Junior Full stack developer </p>
        <p>1 year or so of expirince</p>
        <p>I love to do art, play music, and program</p>
        <p></p>
        <p>
          I am immensely passionate about creative coding and exploring the
          realms of generative art. Through my personal projects, I actively
          seek opportunities to blend technology and artistic expression to
          create mesmerizing visual experiences. By employing programming
          languages like JavaScript and utilizing libraries such as p5.js, I
          delve into the world of algorithms, dynamic patterns, and interactive
          visuals. This fusion of art and coding allows me to unleash my
          creativity and produce captivating works that engage and inspire
          viewers
        </p>
      </div>
    </section>
  );
};
export default About;
