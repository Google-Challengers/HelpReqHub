import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaWhatsapp,
} from "react-icons/fa";

const AboutUs = () => {
  const links = [
    { name: "facebook", iconname: FaFacebookSquare },
    { name: "instagram", iconname: FaInstagramSquare },
    { name: "twitter", iconname: FaTwitterSquare },
    { name: "linked in", iconname: FaLinkedin },
    { name: "whatsapp", iconname: FaWhatsapp },
  ];

  return (
    <>
      <section className="w-full min-h-screen bg-black px-3 py-4 flex flex-col items-center">
        <h1 className="text-6xl md:text-9xl font-black text-white flex flex-col items-center">
          About Us
          <span className="font-light text-slate-100 text-xs md:text-sm text-center m-3">
            This page will tell you about us and this project.
          </span>
        </h1>
        <img
          src={"/about-top.jpg"}
          alt="about mast image"
          width={250}
          height={250}
          className="w-60 h-auto m-3 md:w-full max-w-lg"
          draggable="false"
        />
        <div className="flex flex-row items-end justify-evenly m-2">
          {links.map((link, index) => {
            return (
              <div key={index}>
                <link.iconname className="text-white cursor-pointer hover:text-blue-300 mx-2 font-black text-xl md:text-3xl" />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
