import { useEffect, useState } from "react";
import { Badge } from "../../../public/models/BadgeListType";
import ExtraDisplay from "../../components/displays/extra-display/ExtraDisplay";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import "./Badges.css";
import { BadgeService } from "../../services/badge.service";

function Badges() {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const data = await BadgeService.getBadges();
      setBadges(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="badges-content">
          <div className="bages-display-container">
            <img
              className="milestone-badge-logo"
              src="../images/medal.png"
              alt="Badge-logo"
            />
            <div className="badges-display-text">
              <p className="milestone-text -b">Badges Earned</p>
              <p className="milestone-number">{badges.length}</p>
            </div>
          </div>
          <div className="badge-list">
            {badges.map((b) => (
              <div key={b.id} className="badge-card">
                <p className="badge-text">{b.name}</p>
                <img
                  className="badge-image"
                  src="../images/medal.png"
                  alt={b.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default Badges;
