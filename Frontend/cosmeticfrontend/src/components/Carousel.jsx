import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";
import logo1 from "../assets/logo-1.svg";
import logo2 from "../assets/logo-2.svg";
import logo3 from "../assets/logo-3.svg";
import logo4 from "../assets/logo-4.svg";
import logo5 from "../assets/logo-5.svg";

function MyCarousel() {
  const [getcenterSlidePercentage, setgetcenterSlidePercentage] = useState(20);
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 426px) and (max-width: 1024px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  useEffect(() => {
    if (isMobile) {
      setgetcenterSlidePercentage(50);
      console.log("ismobile", getcenterSlidePercentage);
    } else if (isTablet) {
      setgetcenterSlidePercentage(30);
      console.log("isTablet", getcenterSlidePercentage);
    }
  }, [getcenterSlidePercentage]);
  return (
    <div className="carousel-container ">
      <Carousel
        centerMode={true}
        centerSlidePercentage={getcenterSlidePercentage}
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        interval={2000}
        autoPlay={true}
        emulateTouch={true}
        // renderIndicators={false}
      >
        <div className="carousel-item h-[300px]">
          <img className="object-contain h-full" src={logo1} alt="img" />
        </div>
        <div className="carousel-item h-[300px]">
          <img className="object-contain h-full" src={logo2} alt="img" />
        </div>
        <div className="carousel-item h-[300px]">
          <img className="object-contain h-full" src={logo3} alt="img" />
        </div>
        <div className="carousel-item h-[300px]">
          <img className="object-contain h-full" src={logo4} alt="img" />
        </div>
        <div className="carousel-item h-[300px]">
          <img className="object-contain h-full" src={logo5} alt="img" />
        </div>
      </Carousel>
    </div>
  );
}
export default MyCarousel;
