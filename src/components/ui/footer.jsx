import { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";

import { FaCodeBranch } from "react-icons/fa6";
import { PiGithubLogoFill } from "react-icons/pi";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [repoDetails, setRepoDetails] = useState({
    repocount: 0,
    gitfollowers: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const { data } = await axios.get(
          "https://api.github.com/users/xinzore"
        );
        setRepoDetails({
          repocount: data.public_repos,
          gitfollowers: data.followers,
        });
      } catch (err) {
        console.error("Error fetching repository details:", err);
        setError("Failed to fetch GitHub data.");
        setRepoDetails({ repocount: 0, gitfollowers: 0 });
      }
    };

    fetchRepoDetails();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-[14px] font-Roboto flex flex-row justify-between items-center w-full max-w-[1500px]">
        <footer className="w-full mb-6 flex justify-center flex-col-reverse items-center md:flex-row md:justify-between my-8 md:mx-12 ">
          <div className="flex flex-col justify-center items-center mx-8 md:mx-0 md:items-start md:text-start">
            <div className="font-RobotoMono text-xs text-center md:text-left">
              Kod için{" "}
              <a
                href="https://code.visualstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-tx-accent hover:underline"
              >
                Visual Studio Code
              </a>{" "}
              tasarım için{" "}
              <a
                href="https://www.figma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-tx-accent hover:underline"
              >
                Figma
              </a>
			  {" "}kullanıldı.
            </div>
            <div className="font-RobotoMono text-xs mt-2 md:mt-0">
              &copy; {year} Xinzore
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 mb-2 md:mb-0 ">
            <div
              data-tooltip-id="stars"
              data-tooltip-content="GitHub repository count"
              className="flex items-center gap-3"
            >
              <FaCodeBranch className="h-4 w-4" />
              <p className="text-xs leading-none">{repoDetails.repocount}</p>
            </div>
            <Tooltip id="stars" />
            <div
              data-tooltip-id="forks"
              data-tooltip-content="GitHub followers count"
              className="flex items-center gap-3"
            >
              <PiGithubLogoFill className="h-4 w-4" />
              <p className="text-xs leading-none">{repoDetails.gitfollowers}</p>
            </div>
            <Tooltip id="forks" />
          </div>
        </footer>
        {error && <div className="text-xs mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default Footer;
