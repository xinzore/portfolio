import { Button } from "@/components/ui/button";
import profileImage from "../assets/favi.jpg";
import React from "react";
import { FaArrowRightLong, FaDiscord, FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { SiDreamstime, SiExpress, SiWakatime } from "react-icons/si";
import { motion, AnimatePresence } from "motion/react";
import { TbBrandReact } from "react-icons/tb";
import { PiInstagramLogoFill } from "react-icons/pi";
import { RiTailwindCssFill } from "react-icons/ri";

const HomePage = () => {
  const iconsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Time between each icon animating in
        delayChildren: 0.2, // Optional: delay before the first child starts
      },
    },
  };

  // Renamed for clarity, this will be for each individual icon
  const iconItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Shorter duration for icons
        ease: "easeOut",
      },
    },
  };

  // Variants for the container of the "About Me" paragraphs
  const aboutMeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each paragraph animating in
        delayChildren: 0.1, // Optional: delay before the first child starts
      },
    },
  };

  // Variants for each individual "About Me" paragraph
  const paragraphItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Variants for the container of the action buttons
  const buttonsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Time between each button animating in
        delayChildren: 0.3, // Delay after personal info text, before buttons start
      },
    },
  };

  // Variants for each individual action button
  const buttonItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Variants for the profile image
  const profileImageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9], // Corrected the third value from -0.01 to 0.01
        delay: 0.1, // Slight delay to let text start appearing
      },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
          {/* Profile Image */}

          <motion.div
            className="relative flex justify-center md:order-2"
            variants={profileImageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Fixed-size wrapper */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
              {/* Profile Image */}
              <div className="overflow-hidden rounded-full w-full h-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] z-10">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full bg-main-foreground rounded-full object-cover transform transition-all duration-500 ease-in-out scale-155"
                />
              </div>

              {/* Floating Icons */}
              <div className="absolute top-1 left-16 animate-float-fast z-20 text-main ">
                <SiExpress size={28} />
              </div>
              <motion.div
                className="absolute bottom-4 left-4 z-20"
                animate={{
                  rotate: [0, 360],
                  y: [0, -20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <TbBrandReact size={28} />
              </motion.div>

              <div className="absolute bottom-8 right-2 animate-float z-20">
                <RiTailwindCssFill size={28} />
              </div>
            </div>
          </motion.div>

          {/* Personal Info */}
          <div className="flex flex-col items-center md:items-start md:order-1 space-y-4">
            {/* Wrap personal info text for potential staggered animation too if desired */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.h1
                variants={paragraphItemVariants}
                className="font-bold text-3xl sm:text-4xl text-center md:text-left"
              >
                Xinzore
              </motion.h1>
              <motion.h2
                variants={paragraphItemVariants}
                className="font-bold text-lg sm:text-xl text-center md:text-left mt-4"
              >
                Web Tasaımcı
              </motion.h2>
              <motion.p
                variants={paragraphItemVariants}
                className="text-center md:text-left font-PublicSans max-w-md mt-4"
              >
                Tasarım tutkum hiç bitmez umarım
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-5 w-full max-w-sm "
              variants={buttonsContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={buttonItemVariants} className="w-full">
                <Button
                  onClick={() =>
                    window.open("https://discord.com/users/_sakuno", "_blank")
                  }
                  className="w-full"
                >
                  Bana Yazın <FaArrowRightLong className="ml-2" />
                </Button>
              </motion.div>
              <motion.div variants={buttonItemVariants} className="w-full">
                <Button
                  onClick={() =>
                    window.open("https://calendly.com/sarkarnafe", "_blank")
                  }
                  className="w-full"
                >
                  Telegram'dan Yazın <FaArrowRightLong className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="flex flex-row gap-6 mt-3"
              variants={iconsContainerVariants}
              initial="hidden"
              animate="visible" // Trigger animation on load
            >
              <motion.a
                href="https://github.com/xinzore"
                className="hover:transform hover:scale-110 transition-all"
                variants={iconItemVariants}
              >
                <FaGithub className="h-6 w-6  transition-colors" />
              </motion.a>
              <motion.a
                href="https://discord.com/#"
                className="hover:transform hover:scale-110 transition-all"
                variants={iconItemVariants}
              >
                <FaDiscord className="h-6 w-6  transition-colors" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/#/"
                className="hover:transform hover:scale-110 transition-all"
                variants={iconItemVariants}
              >
                <PiInstagramLogoFill className="h-6 w-6  transition-colors" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="w-full px-4 mb-2 md:px-0">
          <motion.h2
            initial={{ opacity: 0, y: +10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} // Optional delay for heading
            className="font-bold text-xl md:text-xl  mb-2"
          >
            💻Hakkımda
          </motion.h2>
          <motion.div
            className="space-y-4 font-PublicSans text-gray-500 "
            variants={aboutMeContainerVariants}
            initial="hidden"
            animate="visible" // Or use whileInView="visible" and viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={paragraphItemVariants} className="text-justify">
              Dijital dünyada kapsamlı deneyime sahip bir web geliştirici ve çözüm mimarıyım. Temel yetkinliklerim, PHP, JavaScript, HTML ve CSS gibi modern web teknolojilerini kullanarak yüksek performanslı uygulamalar, eklentiler ve temalar tasarlayıp geliştirmeye odaklanmıştır. Özellikle popüler website yazılımları için özelleştirilmiş eklenti ve tema geliştirme konusunda uzmanlaşmış olup, bu sayede kullanıcıların ve işletmelerin özel ihtiyaçlarına uygun, görsel ve işlevsel çözümler sunuyorum. 
            </motion.p>
            <motion.p variants={paragraphItemVariants} className="text-justify">
              İş akışımın önemli bir parçası, sadece kod yazmakla sınırlı kalmayıp, projelerin tüm yaşam döngüsünü yönetmektir. Bu kapsamda, sektörün önde gelen e-ticaret ve forum yazılımlarının kurulumu, yapılandırılması ve özelleştirilmesi konularında derin bilgiye sahibim. Müşterilerime sorunsuz bir dijital altyapı sağlamak için, cPanel ve diğer sunucu yönetim panel yazılımlarını etkin bir şekilde kullanabilmekteyim. Bu yetkinlik, geliştirdiğim uygulamaların ve kurduğum sistemlerin güvenli, istikrarlı ve optimize edilmiş bir ortamda çalışmasını garanti eder.
            </motion.p>
            <motion.p variants={paragraphItemVariants} className="text-justify">
              Amacım, teknik bilgimi ve pratik tecrübemi birleştirerek, müşterilerimin dijital hedeflerine ulaşmalarını sağlayacak sürdürülebilir ve ölçeklenebilir web çözümleri sunmaktır. Yenilikçi yaklaşımlarla, kullanıcı deneyimini ön planda tutan, modern ve etkili dijital varlıklar yaratmaya devam ediyorum.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
