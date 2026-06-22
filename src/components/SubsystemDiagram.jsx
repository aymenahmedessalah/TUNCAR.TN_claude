import { useLanguage } from "../context/LanguageContext";
import { subsystemIcons } from "../utils/iconMap";
import "./SubsystemDiagram.css";

const SYSTEMS = ["Engine", "Suspension", "Body", "Electrical"];

const SYSTEM_COLORS = {
  Engine: "#ef4444",
  Suspension: "#22c55e",
  Body: "#38bdf8",
  Electrical: "#eab308",
};

export default function SubsystemDiagram({ activeSystem, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className="subsystem-diagram fade-in">
      <div className="subsystem-diagram__sidebar">
        {SYSTEMS.map((system) => {
          const Icon = subsystemIcons[system];
          return (
            <button
              key={system}
              className={`subsystem-diagram__item ${activeSystem === system ? "is-selected" : ""}`}
              onClick={() => onSelect(system)}
              style={{ "--system-color": SYSTEM_COLORS[system] }}
            >
              <Icon size={16} />
              {t(`systems.${system}`)}
            </button>
          );
        })}
      </div>

      <div className="subsystem-diagram__svg-area">
        <svg viewBox="0 0 650 250" className="subsystem-diagram__svg">
          <g stroke="#1f3a60" strokeWidth="2" fill="none">
            <path d="M 40 155 C 40 145, 45 130, 60 125 C 80 120, 130 115, 175 90 C 205 72, 395 72, 420 72 C 455 72, 535 80, 560 92 C 585 105, 590 125, 590 145 C 590 160, 580 168, 565 168 L 525 168 C 525 140, 465 140, 465 168 L 195 168 C 195 140, 135 140, 135 168 L 65 168 C 50 168, 40 162, 40 155 Z" />
            <path d="M 215 95 L 375 95 L 375 125 L 200 125 Z" strokeWidth="1.5" />
            <path d="M 385 95 L 515 95 C 530 102, 538 115, 538 125 L 385 125 Z" strokeWidth="1.5" />
            <circle cx="165" cy="168" r="32" strokeWidth="3" />
            <circle cx="495" cy="168" r="32" strokeWidth="3" />
          </g>

          <g
            className={`subsystem-group ${activeSystem === "Engine" ? "is-selected" : ""}`}
            style={{ "--system-color": SYSTEM_COLORS.Engine }}
            onClick={() => onSelect("Engine")}
          >
            <polygon points="45,130 135,123 180,135 180,165 95,165" strokeDasharray="4 3" />
            <text x="120" y="150">
              {t("systems.Engine")}
            </text>
          </g>

          <g
            className={`subsystem-group ${activeSystem === "Suspension" ? "is-selected" : ""}`}
            style={{ "--system-color": SYSTEM_COLORS.Suspension }}
            onClick={() => onSelect("Suspension")}
          >
            <path d="M 125,168 A 40,40 0 0,1 205,168 L 455,168 A 40,40 0 0,1 535,168" strokeDasharray="5 4" />
            <text x="325" y="210">
              {t("systems.Suspension")}
            </text>
          </g>

          <g
            className={`subsystem-group ${activeSystem === "Body" ? "is-selected" : ""}`}
            style={{ "--system-color": SYSTEM_COLORS.Body }}
            onClick={() => onSelect("Body")}
          >
            <path d="M 195,90 L 415,90 L 555,110 L 585,135 L 535,135 L 195,135 Z" strokeDasharray="4 3" />
            <text x="325" y="115">
              {t("systems.Body")}
            </text>
          </g>

          <g
            className={`subsystem-group ${activeSystem === "Electrical" ? "is-selected" : ""}`}
            style={{ "--system-color": SYSTEM_COLORS.Electrical }}
            onClick={() => onSelect("Electrical")}
          >
            <rect x="195" y="120" width="130" height="40" rx="5" strokeDasharray="4 3" />
            <text x="260" y="145">
              {t("systems.Electrical")}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
