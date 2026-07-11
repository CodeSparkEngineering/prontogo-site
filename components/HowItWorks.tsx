import Icon from "@/components/Icon";
import { passos } from "@/lib/content";

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="container">
        <div className="section-head head-center" data-reveal>
          <div className="kicker">Como funciona</div>
          <h2>Três passos. Zero complicações.</h2>
        </div>
        <div className="steps-wrap">
          <svg
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            className="steps-path"
            aria-hidden="true"
          >
            <path
              d="M0 20 C 200 -10, 350 50, 500 20 S 800 -10, 1000 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
              className="dash-anim"
            />
          </svg>
          <div className="steps-grid">
            {passos.map((p) => (
              <div className="step" key={p.num} data-reveal>
                <div className="step-circle">
                  <Icon d={p.icon} size={28} />
                  <span className="step-num">{p.num}</span>
                </div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
