import ExtraDisplay from "../../components/navigation/extra-display/ExtraDisplay";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import "./Settings.css";
import { Select, Switch } from "antd";

const { Option } = Select;

function Settings() {
  const handleDifficultyChange = (value: {
    value: string;
    label: React.ReactNode;
  }) => {
    console.log("Selected difficulty:", value);
  };

  const onSwitchChange = (checked: boolean) => {
    console.log("Switch checked:", checked);
  };

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="settings-container">
          <p className="settings-title">User Settings</p>
          <div className="settings-user-container">
            <img
              src="/images/short-memory.png"
              alt="User's profile picture"
              className="settings-image"
            />
            <div className="settings-user-field">
              <p className="settings-text -b">Username</p>
              <p className="settings-text">Pepe</p>
              <p className="settings-text -b">Email</p>
              <p className="settings-text">tioPepe@gmail.com</p>
              <a href="#" className="settings-text">
                forgot password?
              </a>
            </div>
          </div>
        </div>

        <div className="settings-container">
          <p className="settings-title">Exercise Settings</p>
          <div className="settings-other-container">
            <div className="settings-select-field">
              <p className="settings-text">Difficulty</p>
              <Select
                labelInValue
                defaultValue={{ value: "0", label: "Easy" }}
                style={{ width: 200 }}
                onChange={handleDifficultyChange}
              >
                <Option value="0">Easy</Option>
                <Option value="1">Medium</Option>
                <Option value="2">Hard</Option>
                <Option value="3">Extreme</Option>
              </Select>
            </div>
            <div className="settings-select-field">
              <p className="settings-text">Exercise speed</p>
              <Select
                labelInValue
                defaultValue={{ value: "0", label: "Slow" }}
                style={{ width: 200 }}
                onChange={handleDifficultyChange}
              >
                <Option value="1">Slow</Option>
                <Option value="2">Normal</Option>
                <Option value="3">Fast</Option>
                <Option value="4">Speedy</Option>
              </Select>
            </div>
            <div className="settings-switch-field">
              <div className="custom-switch">
                <Switch defaultChecked onChange={onSwitchChange} />
              </div>
              <p className="settings-text">Sound Effects</p>
            </div>
            <div className="settings-switch-field">
              <div className="custom-switch">
                <Switch defaultChecked onChange={onSwitchChange} />
              </div>
              <p className="settings-text">Background Music</p>
            </div>
          </div>
        </div>

        <div className="settings-container">
          <p className="settings-title">Notifications</p>
          <div className="settings-other-container">
            <div className="settings-switch-field">
              <div className="custom-switch">
                <Switch onChange={onSwitchChange} />
              </div>
              <p className="settings-text">Exercise Completed</p>
            </div>
            <div className="settings-switch-field">
              <div className="custom-switch">
                <Switch onChange={onSwitchChange} />
              </div>
              <p className="settings-text">Daily Progress Report</p>
            </div>
            <div className="settings-switch-field">
              <div className="custom-switch">
                <Switch onChange={onSwitchChange} />
              </div>
              <p className="settings-text">Feedback</p>
            </div>
            <div className="settings-switch-field">
              <div className="custom-switch">
                <Switch onChange={onSwitchChange} />
              </div>
              <p className="settings-text">Email Notifications</p>
            </div>
          </div>
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default Settings;
