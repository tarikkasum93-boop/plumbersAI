export type CourseItem = {
  type: 'slide' | 'quiz' | 'simulation';
  title?: string;
  content?: string;
  q?: string;
  options?: string[];
  correct?: number;
  simulationType?: 'sensor-fusion';
  imageUrl?: string;
};

/**
 * Helper to format power values.
 * Converts Kilowatts to British Thermal Units per hour for the US system.
 * Conversion factor used: 1 kW = 3412.142 BTU/hr
 */
const formatPower = (kw: number, unit: 'UK' | 'US'): string => {
  if (unit === 'US') {
    const btuHr = Math.round(kw * 3412.142);
    return `${kw}kW (approx. ${btuHr.toLocaleString()} BTU/hr)`;
  }
  return `${kw}kW`;
};

/**
 * Helper to format temperature values.
 * Converts Celsius to Fahrenheit for the US system.
 * Conversion factor used: °F = (°C × 9/5) + 32
 */
const formatTemp = (celsius: number, unit: 'UK' | 'US'): string => {
  if (unit === 'US') {
    const fahrenheit = Math.round((celsius * 9/5) + 32);
    return `${fahrenheit}°F`;
  }
  return `${celsius}°C`;
};

/**
 * Helper to format flow rate units.
 * Converts Liters Per Minute (LPM) to Gallons Per Minute (GPM).
 * Conversion factor used: 1 LPM = 0.264172 GPM
 * Note: Currently only used for displaying the unit acronym.
 */
const flowRateUnit = (unit: 'UK' | 'US'): string => {
  return unit === 'US' ? 'GPM' : 'LPM';
};

export const getCourseData = (unit: 'UK' | 'US'): CourseItem[] => [
  // INTRO MODULE: BEGINNER LEVEL COURSE
  { type: 'slide', title: 'Beginner Level Course', content: `<p><strong>Focus:</strong> Foundational understanding, practical awareness, and career confidence for complete newcomers.</p>` },
  { type: 'slide', title: 'What is an AI Plumber?', content: `<p>A skilled technician who combines traditional plumbing expertise with artificial intelligence, Internet of Things (IoT) sensors, robotics, and predictive analytics to design, monitor, maintain, and repair liquid cooling systems in high-density data centres, particularly those supporting large-scale artificial intelligence workloads.</p><p>An AI Plumber emphasises the fusion of mechanical trades with advanced digital technologies. While the role retains core plumbing competencies (pipework, valves, pressure management, leak prevention), it is distinguished by expertise in sensor fusion, robotic intervention, anomaly detection, and compliance.</p>` },
  { type: 'slide', title: 'Roles & Responsibilities (1-3)', content: `<ul className="list-disc pl-5 space-y-2">
  <li><strong>Monitor and Maintain Systems:</strong> Ensure continuous flow of chilled water/coolant to server racks and CDUs. <em>Skills: Basic fluid flow, gauge reading, attention to detail.</em></li>
  <li><strong>Install, Inspect, and Repair:</strong> Hot-swap installations and leak-free connections on live systems. <em>Skills: Mechanical aptitude, torque specs, safety, dexterity.</em></li>
  <li><strong>IoT Sensors & Leak Detection:</strong> Install and respond to moisture, pressure, and flow sensors. <em>Skills: Basic sensor knowledge, dashboard interpretation, troubleshooting.</em></li>
  </ul>` },
  { type: 'slide', title: 'Roles & Responsibilities (4-6)', content: `<ul className="list-disc pl-5 space-y-2">
  <li><strong>Predictive Tools & Alerts:</strong> Review AI-generated alerts for anomalies and take proactive action. <em>Skills: Trend graphs, data interpretation, problem-solving.</em></li>
  <li><strong>Robots & Automated Tools:</strong> Deploy pipe-crawling robots for internal inspection and minor repairs. <em>Skills: Robot operation, spatial awareness, safety, human-robot collaboration.</em></li>
  <li><strong>Predictive & Preventive Maintenance:</strong> Execute maintenance based on AI recommendations to maximize uptime. <em>Skills: Organization, reliability concepts, time management.</em></li>
  </ul>` },
  { type: 'slide', title: 'Roles & Responsibilities (7-10)', content: `<ul className="list-disc pl-5 space-y-2">
  <li><strong>Ensure Compliance:</strong> Follow ASHRAE, TIA-942, safety standards, LOTO, and spill containment. <em>Skills: Regulatory details, safety-first mindset, audit readiness.</em></li>
  <li><strong>Support Retrofitting/Expansion:</strong> Upgrade air-cooled halls to liquid cooling or expand capacity. <em>Skills: Adaptability, basic schematics, teamwork.</em></li>
  <li><strong>Document & Communicate:</strong> Log every intervention and explain issues to cross-functional teams. <em>Skills: Communication, professional documentation.</em></li>
  <li><strong>Continuously Learn & Optimize:</strong> Participate in training and suggest improvements. <em>Skills: Growth mindset, curiosity, ongoing learning.</em></li>
  </ul>` },
  { type: 'slide', title: 'Summary of Core Skill Categories', content: `<ul className="list-disc pl-5 space-y-2">
  <li><strong>Mechanical & Hands-on:</strong> Plumbing basics, tool use, physical dexterity</li>
  <li><strong>Digital & Monitoring:</strong> Reading dashboards, sensors, simple data trends</li>
  <li><strong>Safety & Compliance:</strong> Procedures, risk awareness, documentation</li>
  <li><strong>Soft Skills:</strong> Communication, teamwork, problem-solving, adaptability</li>
  <li><strong>Learning Agility:</strong> Willingness to master new tools (robots, AI alerts, VR)</li>
  </ul><p class="mt-4"><em>This role is highly accessible to motivated graduates. Technical skills are taught on the job — the most important starting qualities are reliability, attention to detail, and a genuine interest in keeping critical AI infrastructure running smoothly.</em></p>` },
  { type: 'quiz', q: 'What best accurately describes an AI Plumber?', options: ['A software engineer who writes code for plumbing components.', 'A skilled technician combining plumbing with IoT, sensors, and AI to repair and maintain liquid cooling systems.', 'A traditional plumber who uses AI to schedule normal pipe repair appointments.'], correct: 1 },
  { type: 'quiz', q: 'Which of the following is NOT a core category of skills needed for an AI Plumber?', options: ['Mechanical & Hands-on', 'Machine Learning Algorithm Design', 'Digital & Monitoring'], correct: 1 },
  { type: 'quiz', q: 'What is a key responsibility when interacting with IoT Sensors and Leak Detection systems?', options: ['Writing custom software for every new sensor.', 'Installing sensors and responding immediately to alerts based on dashboard interpretation.', 'Ignoring alerts unless physically seeing a puddle.'], correct: 1 },

  // MODULE 1
  { type: 'slide', title: '1. Introduction: The Stakes and Responsibility', content: `<p>Your domain is the data center. A single H100 GPU consumes 700W. A rack can draw up to \${formatPower(100, unit)}. Air cannot absorb this level of thermal density.</p><p>Your objective is to maintain and operate the liquid cooling loops extracting this extreme heat.</p><div class="tech-box">Rule #1: Water is the superior thermal conductor, but the ultimate enemy of electronics. Your operational precision is the only barrier separating these two states.</div>` },
  { type: 'slide', title: '2. PUE - The Metric of Efficiency', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/pue-table.png', content: `<p>Power Usage Effectiveness (PUE) is the ratio of total facility power consumption to the power consumed by computing equipment.</p><ul><li><b>PUE 1.5:</b> Legacy air-cooled data centers.</li><li><b>PUE 1.1:</b> Modern AI data centers utilizing direct liquid cooling.</li></ul><p>The operational imperative is driving this coefficient as close to 1.0 as physically possible.</p>` },
  { type: 'slide', title: '3. The Physics of Heat Transfer', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/heat-transfer.png', content: `<p>Thermal exchange is governed by the equation: Q = m × Cp × ΔT</p><p>If a primary filtration unit clogs, the mass fluid flow (m in \${flowRateUnit(unit)}) decreases. To maintain thermal extraction (Q), the temperature differential (ΔT) surges exponentially, triggering hardware throttling and catastrophic shutdowns.</p>` },
  { type: 'slide', title: '4. Piping Architecture', content: `<p>Coolant transport networks are suspended in overhead conveyances or routed beneath raised sub-flooring.</p><p>Copper is widely restricted due to its high potential to act as a catalyst for galvanic corrosion in complex, mixed-metal topologies.</p>` },
  { type: 'slide', title: '5. Galvanic Corrosion', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/galvanic-corrosion.png', content: `<p>Integrating copper and aluminum within the same fluid loop without proper chemical inhibitors forms a microscopic battery. The metals structurally degrade themselves.</p><div class="tech-box">We are not merely mechanical operators; we are fluid chemists actively calibrating pH levels, inhibitor concentrations, and fluid conductivity.</div>` },
  { type: 'slide', title: '6. Pressure and Cavitation', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/cavitation.png', content: `<p>When pump suction demands exceed available fluid flow, localized pressure drops cause the fluid to boil at ambient temperature (approx. \${formatTemp(20, unit)}). This phenomenon is called Cavitation.</p><p>It sounds like gravel passing through the pump casing. The system must be halted immediately to prevent impeller disintegration.</p>` },
  { type: 'quiz', q: 'According to the thermal formula Q = m × Cp × ΔT, what occurs if the mass flow rate (m) experiences a sudden drop?', options: ['The system self-optimizes, resulting in reduced power expenditure.', 'The temperature differential (ΔT) surges rapidly, causing critical server overheating.', 'The facility PUE coefficient immediately drops to 1.0.'], correct: 1 },
  { type: 'quiz', q: 'Which PUE ratio represents a modern AI data center utilizing direct liquid cooling?', options: ['1.5', '1.1', '2.0'], correct: 1 },
  { type: 'quiz', q: 'Why is copper restricted in complex, mixed-metal coolant transport networks?', options: ['It is too heavy.', 'It acts as a catalyst for galvanic corrosion.', 'It absorbs too much heat.'], correct: 1 },

  // MODULE 2
  { type: 'slide', title: '7. What is a CDU?', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/cdu.png', content: `<p>The Coolant Distribution Unit (CDU) constitutes the circulatory heart of the loop. It physically isolates untreated facility water from the ultra-pure, finely calibrated coolant delivered to the server hardware.</p>` },
  { type: 'slide', title: '8. Primary vs. Secondary Loops', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/boiler-chiller.png', content: `<ul><li><b>Primary Loop (FWS):</b> High-capacity facility infrastructure supplying chilled fluid to the exterior of the CDU.</li><li><b>Secondary Loop (TCS):</b> The Technology Cooling System; surgically pure fluid circulating from the CDU directly to the processors.</li></ul>` },
  { type: 'slide', title: '9. Direct-to-Chip (D2C) Cooling', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/direct-to-chip.png', content: `<p>Coolant traverses through a micro-channel Cold Plate—often less than a millimeter thick at the interface—affixed directly to the silicon die.</p>` },
  { type: 'slide', title: '10. Quick Disconnect (QD)', content: `<p>Specialized hydraulic couplings enabling pressurized connections and disconnections with zero fluid leakage.</p><div class="tech-box">A distinct tactile and auditory "click" is required. Absent this verification, the O-ring seal is compromised.</div>` },
  { type: 'slide', title: '11. Manifold Architecture', content: `<p>The primary distribution headers bridging main lines to individual server chassis. These must be rigorously hydraulically balanced, ensuring identical fluid pressure for the first and last server in the rack.</p>` },
  { type: 'slide', title: '12. Immersion Cooling', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/immersion-cooling.png', content: `<p>Complete submersion of server hardware within engineered dielectric fluids. This architecture utilizes no water—only specialized, non-conductive synthetic hydrocarbons or fluorochemicals.</p>` },
  { type: 'quiz', q: 'What is the specific function of the secondary loop (TCS)?', options: ['To circulate ultra-pure, chemically treated coolant directly to the AI processors.', 'To expel and manage condensation and environmental water from the facility.', 'To provide hydraulic lubrication for the mechanical pump bearings.'], correct: 0 },
  { type: 'quiz', q: 'What is a necessary verification step when using a Quick Disconnect (QD)?', options: ['Visual inspection only.', 'A distinct tactile and auditory "click" to ensure the seal is not compromised.', 'Tightening with a wrench.'], correct: 1 },
  { type: 'quiz', q: 'What fluid is typically utilized in Immersion Cooling?', options: ['Ultrapure water.', 'Standard facility chilled water.', 'Specialized, non-conductive synthetic hydrocarbons or fluorochemicals.'], correct: 2 },

  // MODULE 3
  { type: 'slide', title: '13. Digital Telemetry', content: `<p>We do not wait for visual confirmation of fluid leaks. We continuously monitor high-frequency telemetry streams and sensor dashboards.</p>` },
  { type: 'slide', title: '14. Capacitive Sensing', content: `<p>Sensing ribbons deployed beneath floor tiles that detect moisture droplets as small as a grain of rice by registering minute fluctuations in electrical capacitance.</p>` },
  { type: 'slide', title: '15. Ultrasonic Flow Validation', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/ultrasonic-flowmeter.png', content: `<p>Non-invasive sensors clamped externally to piping, measuring acoustic wave transit times. If the inlet flow rate (${flowRateUnit(unit)}) exceeds the return rate, a systemic leak is occurring in the dark.</p>` },
  { type: 'slide', title: '16. Differential Pressure (DP)', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/differential-pressure.png', content: `<p>Continuously measuring fluid pressure upstream and downstream of a filtration unit. An escalating differential indicates progressive filter occlusion.</p>` },
  { type: 'slide', title: '17. Sensor Fusion', content: `<div class="tech-box">Telemetry Aggregation: Acute Pressure Drop + Elevated Pump Vibration = Impending Hardware Failure. We execute preventative mitigation before a critical event.</div>` },
  { type: 'simulation', title: 'Interactive Simulator: Sensor Fusion', simulationType: 'sensor-fusion', content: `<p>Adjust the simulated sensor readings below to observe how the AI aggregates telemetry (Flow, Pressure, Humidity) to confirm a critical leak event.</p>` },
  { type: 'slide', title: '18. Dew Point and Condensation', content: `<p>The primary catalyst for false leak alarms is condensation accumulating on sub-ambient supply lines. Technicians must accurately monitor the localized environmental dew point.</p>` },
  { type: 'quiz', q: 'How do ultrasonic flow meters successfully identify hidden systemic leaks?', options: ['By penetrating structural walls using infrared thermal imaging arrays.', 'By calculating the deficit in fluid velocity between the inlet and outlet measurement nodes.', 'By monitoring ambient acoustic noise levels within the server hall.'], correct: 1 },
  { type: 'quiz', q: 'What do Capacitive Sensing ribbons detect?', options: ['Air pressure drops.', 'Systemic vibration anomalies.', 'Moisture droplets as small as a grain of rice via electrical capacitance fluctuations.'], correct: 2 },
  { type: 'quiz', q: 'What is indicated by an escalating Differential Pressure (DP) across a filtration unit?', options: ['Progressive filter occlusion (clogging).', 'A leak in the primary loop.', 'Low room humidity.'], correct: 0 },

  // MODULE 4
  { type: 'slide', title: '19. Hot-Swapping Components', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/hot-swap.png', content: `<p>The execution of repairs and valve replacements while the facility remains fully energized, achieved by shunting fluid through redundant bypass circuits.</p>` },
  { type: 'slide', title: '20. Thermal Inspection', content: `<p>Deploying radiometric thermal imaging cameras to identify internal flow blockages, visualizing stagnant cold pockets within opaque piping.</p>` },
  { type: 'slide', title: '21. Actuated Valving', content: `<p>Motorized or pneumatic valves engineered for millisecond response times. They must incorporate a mechanical manual override mechanism to circumvent actuator failure.</p>` },
  { type: 'slide', title: '22. UV Sterilization', content: `<p>Ultraviolet irradiation neutralizes biological contaminants within tepid coolant loops, eliminating bacterial slimes that occlude micro-channels within processor cold plates.</p>` },
  { type: 'slide', title: '23. System Deaeration', content: `<p>Entrained atmospheric gases accelerate internal corrosion and degrade thermal transfer efficiency. Rigorous manual and automated air purging procedures are strictly mandated.</p>` },
  { type: 'slide', title: '24. Hydraulic Shock (Water Hammer)', content: `<div class="tech-box">Hydraulic shock is induced by the abrupt closure of a valve. The resulting kinetic pressure wave can rupture schedule-80 piping. Valve closure speeds must be governor-regulated.</div>` },
  { type: 'quiz', q: 'What is the primary operational cause of a "Water Hammer" (hydraulic shock) event?', options: ['Unregulated bacterial colonization within the coolant system.', 'A rapid deceleration of ambient facility temperature.', 'The transient pressure spike caused by closing a valve too rapidly against active flow.'], correct: 2 },
  { type: 'quiz', q: 'Why is UV sterilization deployed in tepid coolant loops?', options: ['To heat the water slightly.', 'To eliminate biological contaminants and bacterial slimes that occlude micro-channels.', 'To detect leaks visually.'], correct: 1 },
  { type: 'quiz', q: 'What is the purpose of System Deaeration?', options: ['To add oxygen to the water.', 'To remove entrained atmospheric gases that accelerate internal corrosion and degrade thermal transfer efficiency.', 'To increase system fluid pressure.'], correct: 1 },

  // MODULE 5
  { type: 'slide', title: '25. Remote Visual Inspection (RVI)', content: `<p>Miniaturized crawler robots deployed directly into large-diameter facility mains to conduct internal optical inspections for micro-fractures and corrosive scaling.</p>` },
  { type: 'slide', title: '26. AI-Driven Predictive Maintenance', content: `<p>Machine learning models analyzing historical telemetry logs to prescribe component replacement schedules—often predicting mechanical failure 10 days in advance.</p>` },
  { type: 'slide', title: '27. Vibration Analysis', content: `<p>Pump bearings generate distinct acoustic deviations prior to catastrophic failure. High-fidelity piezoelectric sensors capture and classify these micro-vibrations.</p>` },
  { type: 'slide', title: '28. Autonomous Thermal Drones', content: `<p>UAVs navigating the server hall ceiling plenum, mapping atmospheric thermal anomalies orders of magnitude faster than terrestrial manual inspections.</p>` },
  { type: 'slide', title: '29. Augmented Reality (AR)', content: `<p>Technicians leveraging AR headsets to overlay real-time SCADA telemetry—such as live fluid pressure and temperature—directly onto the physical piping infrastructure in their field of view.</p>` },
  { type: 'slide', title: '30. Digital Twins', content: `<div class="tech-box">A fully synchronized, real-time 3D physics simulation of the entire cooling topology. You validate pressure dynamics and valve sequencing in the twin before initiating high-risk physical interventions.</div>` },
  { type: 'quiz', q: 'What exact operational capability does a "Digital Twin" provide to the engineer?', options: ['The automated requisitioning of secondary support personnel.', 'The capability to safely simulate complex fluid dynamics and valve operations virtually prior to physical execution.', 'The localized 3D printing of standard replacement components on the facility floor.'], correct: 1 },
  { type: 'quiz', q: 'What do Autonomous Thermal Drones do?', options: ['Carry spare parts to technicians.', 'Map atmospheric thermal anomalies in the ceiling plenum to detect hot spots.', 'Provide physical security for the data center.'], correct: 1 },
  { type: 'quiz', q: 'How do AI-driven Predictive Maintenance models analyze mechanical health?', options: ['By interpreting historical telemetry logs to prescribe replacement schedules before failure occurs.', 'By waiting for a part to break and alerting the nearest engineer.', 'By shutting off cooling to non-critical servers.'], correct: 0 },

  // MODULE 6: DIGITAL SENSES & TELEMETRY
  { type: 'slide', title: '46. The Digital Nervous System', imageUrl: 'https://raw.githubusercontent.com/tarikkasum93-boop/plumbersAI/refs/heads/main/public/sensor-network.png', content: '<p>If you can\'t measure it, you can\'t manage it. Modern AI plumbers rely on dashboards, not just wrenches. You must learn to "see" the water through the telemetry data.</p><div class="tech-box mt-4"><strong>[AI Image Prompt]</strong> Photorealistic wide shot of a high-tech data center control room. Focus on a massive matte-black dashboard displaying liquid cooling telemetry, isometric pipe diagrams, and flow metrics in glowing neon cyan and NVIDIA green. Cinematic lighting, depth of field, 8k resolution.</div>' },
  { type: 'slide', title: '47. Ultrasonic Flow Meters', content: '<p>Non-invasive flow tracking. These sensors clamp to the OUTSIDE of the pipe. They send a sound wave diagonally through the fluid and measure how long it takes to bounce back, calculating Liters Per Minute (LPM) via the Doppler shift.</p>' },
  { type: 'slide', title: '48. Differential Pressure (DP) Transmitters', content: '<p>Installed across filters and strainers. They sense the "effort" of the pump. If the DP rises rapidly, water is struggling to push through. Your strainer is clogged with debris and requires immediate cleaning.</p><div class="tech-box mt-4"><strong>[AI Video Prompt]</strong> Cinematic 4k slow-motion 3D animation showing water flowing through a stainless steel pipe filter. The animation visualizes pressure building up as microscopic glowing red debris gets caught in the mesh, causing the pressure gauge needle to slowly spike into the red zone.</div>' },
  { type: 'slide', title: '49. Capacitive Moisture Ropes', content: '<p>A sensing cable laid beneath raised floors and under rack manifolds. It detects a single drop of water via a change in electrical resistance and pinpoints the exact meter distance of the leak on your dashboard.</p>' },
  { type: 'slide', title: '50. Sensor Fusion Logic', content: '<p>A single sensor alarming is a guess; three sensors alarming is a fact. We cross-reference a sudden drop in flow, a drop in static pressure, and a localized humidity spike to confirm a major leak exists.</p><div class="tech-box mt-4"><strong>[AI Code/Animation Prompt]</strong> Write an interactive HTML/JS widget simulating Data Center Sensor Fusion. Display three sliders: Flow Rate, System Pressure, and Local Humidity. If the user drops flow, drops pressure, and spikes humidity simultaneously, trigger a flashing red CRITICAL LEAK CONFIRMED state.</div>' },
  { type: 'slide', title: '51. RTD Temperature Probes', content: '<p>Resistance Temperature Detectors. More durable and accurate than standard Thermocouples. Essential for measuring the "Approach Temperature" across the Heat Exchanger.</p>' },
  { type: 'slide', title: '52. Smart Valve Actuators', content: '<p>Valves that talk back to the control room. They report their exact percentage of opening and send alerts if their internal motor is drawing too much electrical current, predicting mechanical failure.</p>' },
  { type: 'slide', title: '53. BACnet & Modbus Protocols', content: '<p>The digital languages your sensors speak. If a sensor reads "Offline", use a multimeter to check the 24V DC power supply and ensure the twisted-pair data wires are securely terminated.</p>' },
  { type: 'slide', title: '54. Cloud Telemetry & Cybersecurity', content: '<p>As a technician, ensure you only use secure, "Read-Only" diagnostic ports when plugging your laptop into the local network to prevent accidental malware injection into the cooling logic.</p>' },
  // QUIZ 6
  { type: 'quiz', q: 'How does an Ultrasonic Flow Meter calculate flow?', options: ['By spinning an internal turbine.', 'By measuring the speed of sound waves passed diagonally through the moving fluid.', 'By weighing the pipe.'], correct: 1 },
  { type: 'quiz', q: 'What does a rising Differential Pressure (DP) across a strainer indicate?', options: ['The water is freezing.', 'The strainer is occluding with debris and restricting flow.', 'The pump is spinning too fast.'], correct: 1 },
  { type: 'quiz', q: 'What is Sensor Fusion?', options: ['Welding two sensors together.', 'Cross-referencing multiple data points to confirm a physical reality before triggering an alarm.', 'Powering sensors from the same electrical breaker.'], correct: 1 },

  // MODULE 7
  { type: 'slide', title: '55. The Enemy - Condensation', content: '<p>If your pipe temperature is LOWER than the room\'s ambient dew point, the pipe will "sweat." Water droplets will form, pool, and fall directly onto the server electronics.</p><div class="tech-box mt-4"><strong>[AI Video Prompt]</strong> Extreme macro slow-motion 4k video of condensation droplets forming on a matte-black chilled water pipe...</div>' },
  { type: 'slide', title: '56. The Dew Point Rule', content: '<p>The Dew Point is the exact temperature at which air can no longer hold its moisture. Rule of Thumb: Your Coolant Supply Temperature must ALWAYS be maintained at least 2°C above the room\'s ambient Dew Point.</p>' },
  { type: 'slide', title: '57. Dehumidification Strategies', content: '<p>We actively dehumidify the server hall to keep the dew point low. A low dew point allows us to use colder water in the pipes without risking condensation.</p>' },
  { type: 'slide', title: '58. Managing False Alarms', content: '<p>The number one cause of moisture sensor false alarms is temporary condensation dripping from a poorly insulated valve. Ensure vapor barrier tape is perfectly sealed on all chilled surfaces.</p>' },
  { type: 'slide', title: '59. Air Removal (AAVs)', content: '<p>Air trapped in the loop causes corrosion and acts as a massive thermal insulator. We utilize Automatic Air Vents (AAVs) and mechanical "Air-Scoops" to continually purge micro-bubbles.</p><div class="tech-box mt-4"><strong>[AI Code/Animation Prompt]</strong> Create a 2D physics animation showing an \'Air Scoop\' inside a pipe...</div>' },
  { type: 'slide', title: '60. Variable Frequency Drives (VFDs)', content: '<p>VFDs control the electrical frequency sent to the pump to change its RPM. We save massive amounts of electricity by running the pump at the slowest possible speed that still meets ΔT targets.</p>' },
  { type: 'slide', title: '61. Glycol Concentration', content: '<p>In primary loops exposed to outside weather, we dose the water with Propylene Glycol to prevent freezing. Use an optical Refractometer to check the percentage. Too high = poor heat transfer. Too low = burst pipes in winter.</p>' },
  { type: 'slide', title: '62. Microbiological Control', content: '<p>Warm water (30°C - 45°C) in secondary loops is a perfect breeding ground for bacteria and Legionella. Automated biocide dosing systems are mandatory.</p>' },
  { type: 'slide', title: '63. Sealing the Hall', content: '<p>Check for structural "Air-Leaks" from the data hall to the outside. Summer humidity sneaking in raises the dew point instantly, crashing your safety margins.</p>' },
  // QUIZ 7
  { type: 'quiz', q: 'What is the Dew Point?', options: ['The time of day moisture forms.', 'The exact temperature at which air reaches 100% relative humidity and water vapor condenses into liquid.', 'The freezing point of water.'], correct: 1 },
  { type: 'quiz', q: 'What is the golden rule for Coolant Supply Temperature?', options: ['It must be below freezing.', 'It must be at least 2°C ABOVE the ambient Dew Point.', 'It must match the outside temperature.'], correct: 1 },
  { type: 'quiz', q: 'How does a Variable Frequency Drive (VFD) save electricity?', options: ['It shuts the pump off entirely.', 'It changes the electrical frequency to lower the pump\'s RPM to the exact speed needed, rather than running at 100% constantly.', 'It generates its own power.'], correct: 1 },

  // MODULE 8
  { type: 'slide', title: '64. The Hot-Swap Procedure', content: '<p>Replacing a dead server while the 100kW rack remains live. 1. Visually inspect QD valves. 2. Disengage locking collar. 3. Verify zero residual drips. 4. Cap hoses to prevent dust ingress.</p><div class="tech-box mt-4"><strong>[AI Image Prompt]</strong> First-person POV of an engineer\'s gloved hands disconnecting a matte-black Universal Quick Disconnect (UQD) fitting from a server blade. A single drop of glowing blue coolant is visible. High-tech, cinematic, depth of field.</div>' },
  { type: 'slide', title: '65. Secondary Loop Bypass', content: '<p>During emergency CDU repair, manually open mechanical bypass valves to route facility water directly to temporary chillers, overriding digital controls to keep servers alive.</p>' },
  { type: 'slide', title: '66. Redundancy Testing (Failover)', content: '<p>Trust, but verify. Manually trip the electrical breaker on Pump A during a maintenance window to verify Pump B automatically engages within 2 seconds.</p>' },
  { type: 'slide', title: '67. Bleeding a Manifold', content: '<p>Manual bleeding is a master\'s skill. Attach a clear plastic hose to the highest manifold bleed valve and purge into a bucket until you see a "Solid Stream" with zero air bubbles.</p>' },
  { type: 'slide', title: '68. Emergency Hose Isolation', content: '<p>If a flexible server hose ruptures and the QD fails, use a specialized mechanical "Crimp-off" tool to clamp the hose flat, isolating the leak without draining the entire rack.</p>' },
  { type: 'slide', title: '69. Chemical Flushing', content: '<p>New piping systems are filthy. Execute a 24-hour chemical flush to strip oils, weld slag, and grit from pipes, followed by a pure de-ionized water rinse until conductivity drops below 5 μS/cm.</p>' },
  { type: 'slide', title: '70. PID Tuning Awareness', content: '<p>If automated valves are opening and closing erratically ("Hunting"), the PID software logic is overcorrecting. It requires mathematical recalibration by the controls engineer.</p>' },
  { type: 'slide', title: '71. Critical Leak Response (Level 1)', content: '<p>In the event of a burst main:<br>Priority 1: Isolation (Shut specific zone valves).<br>Priority 2: Containment (Deploy floor dams to protect adjacent racks).<br>Priority 3: Scavenging (Engage wet-vacs).</p><div class="tech-box mt-4"><strong>[AI Video Prompt]</strong> Fast-paced, action-oriented 4k video. An engineer in a data center slams a massive red isolation valve shut on a stainless steel pipe. Water stops spraying. The engineer immediately kicks a yellow containment boom across the floor to protect the server racks. Highly cinematic.</div>' },
  { type: 'slide', title: '72. LOTO Integration', content: '<p>Never perform a mechanical intervention without applying a physical Lockout/Tagout padlock to BOTH the electrical breaker AND the mechanical isolation valves.</p>' },
  // QUIZ 8
  { type: 'quiz', q: 'What is the critical final step after disconnecting a server via Quick Disconnect (QD)?', options: ['Drain the fluid into a bucket.', 'Immediately install dust caps on the fittings to prevent microscopic debris ingress.', 'Turn off the pump.'], correct: 1 },
  { type: 'quiz', q: 'When is a Secondary Loop Bypass used?', options: ['During normal operations to save power.', 'During a total CDU failure, to route water to temporary chillers and keep the servers alive.', 'When the water is too clean.'], correct: 1 },
  { type: 'quiz', q: 'During a Redundancy Failover test, what is the maximum acceptable time for Pump B to engage after Pump A fails?', options: ['1 minute.', '2 seconds (any longer causes thermal throttling).', '30 seconds.'], correct: 1 },

  // MODULE 9
  { type: 'slide', title: '73. Predictive Maintenance (AI)', content: '<p>The era of calendar-based maintenance is over. AI analyzes millions of data points to issue a work order to replace a pump seal 14 days *before* it statistically fails based on telemetry trends.</p>' },
  { type: 'slide', title: '74. Acoustic Vibration Analysis', content: '<p>Acoustic sensors on pumps detect micro-vibrations. A bearing wearing out changes its frequency signature (measured in Hertz) weeks before it physically heats up or seizes.</p>' },
  { type: 'slide', title: '75. Pipe-Crawling Robotics', content: '<p>Tethered robotic crawlers map internal scale and weld-corrosion inside 12-inch primary mains without draining the system.</p><div class="tech-box mt-4"><strong>[AI Image Prompt]</strong> Photorealistic rendering of a sleek, waterproof, multi-wheeled robotic crawler navigating the inside of a massive stainless steel pipe. It projects a blue laser grid onto the pipe walls to detect fractures. Industrial, cinematic 8k.</div>' },
  { type: 'slide', title: '76. Thermal Drone Inspections', content: '<p>Indoor drones scan overhead manifolds for thermal anomalies (hot spots). A warm joint on a cold pipe indicates a high-resistance blockage.</p>' },
  { type: 'slide', title: '77. Augmented Reality (AR) Repair', content: '<p>Technicians wear AR headsets. As you look at a pipe, the system projects the 3D CAD model, live pressure, and flow rates onto your retinas.</p>' },
  { type: 'slide', title: '78. Digital Twin Strategy', content: '<p>A 3D digital simulation running in real-time. Test "What-If" scenarios (like closing a major bypass valve) in the virtual model before touching physical infrastructure.</p><div class="tech-box mt-4"><strong>[AI Code/Animation Prompt]</strong> Create a JSON specification for an interactive \'Digital Twin\' dashboard. Users see a 3D isometric view of a cooling loop...</div>' },
  { type: 'slide', title: '79. Smart-Dust Sensors', content: '<p>Nano-sensors floating freely in the coolant, continuously transmitting real-time data on mineral spikes and pH levels from inside the server blocks.</p>' },
  { type: 'slide', title: '80. Sovereign Waste Heat Recovery', content: '<p>Data centers generate massive heat. Sovereign infrastructure mandates capturing this heat and routing it to local district heating networks to warm nearby homes.</p>' },
  { type: 'slide', title: '81. Self-Healing Polymers', content: '<p>Emerging pipe linings containing micro-capsules of epoxy resin. If a micro-fissure develops, the capsules break and seal the leak automatically upon contact with oxygen.</p>' },
  // QUIZ 9
  { type: 'quiz', q: 'What is the fundamental difference between Predictive Maintenance and Preventive Maintenance?', options: ['Predictive waits for a failure; Preventive replaces everything immediately.', 'Preventive uses a fixed calendar; Predictive uses real-time AI telemetry to predict an exact failure date before it happens.', 'There is no difference.'], correct: 1 },
  { type: 'quiz', q: 'What specifically does Acoustic Vibration Analysis measure?', options: ['The volume of the water flowing.', 'Changes in the frequency signature (Hertz) of mechanical bearings to detect micro-wear.', 'The voice of the operator.'], correct: 1 },
  { type: 'quiz', q: 'What is the primary operational advantage of a Pipe-Crawling Robot?', options: ['It can weld pipes together.', 'It can map internal corrosion and scale buildup without requiring the system to be shut down and drained.', 'It cleans the outside of the pipes.'], correct: 1 },

  // MODULE 10
  { type: 'slide', title: '82. ASHRAE TC 9.9 Standards', content: '<p>This is your professional Bible. ASHRAE defines the absolute thermal limits. Modern liquid cooling operates within the "W4" class (Supply water allowed up to 45°C).</p>' },
  { type: 'slide', title: '83. Documentation (CMMS)', content: '<p>If it wasn\'t logged, it wasn\'t done. Record every valve turn, torque setting, and chemical dose in the Computerized Maintenance Management System (CMMS) for audit compliance.</p>' },
  { type: 'slide', title: '84. The 24/7 Operator Mindset', content: '<p>AI training models run for months. A 5-minute cooling outage destroys millions of dollars. Reliability supersedes Efficiency.</p>' },
  { type: 'slide', title: '85. IT Cross-Communication', content: '<p>50% of your job is communicating cooling capacities to the IT server engineers so they know where to safely deploy new, high-density racks without crashing the grid.</p><div class="tech-box mt-4"><strong>[AI Image Prompt]</strong> A rugged, experienced data center facility engineer holding a blueprint, talking with an IT server architect in front of a glowing rack of H100 GPUs. Professional, collaborative, cinematic lighting, realistic.</div>' },
  { type: 'slide', title: '86. Continuous OEM Training', content: '<p>The technology changes every 18 months. Commit to continuous certification with OEMs like Vertiv, Schneider Electric, and CoolIT.</p>' },
  { type: 'slide', title: '87. Building Your Network', content: '<p>Join organizations like AFCOM or ASHRAE. When you encounter a bizarre "Ghost Alarm" at 2 AM, your network of peers is your best troubleshooting resource.</p>' },
  { type: 'slide', title: '88. The Path to Management', content: '<p>The AI Plumber is a severely bottlenecked skillset globally. Mastering this trade provides a direct career path from "Hands-on-Pipes" to "Facility Operations Director."</p>' },
  { type: 'slide', title: '89. The Master\'s Secret', content: '<p>Trust your digital gauges, but believe your human senses. A mechanical room that "sounds" wrong, or a pipe that "smells" like ozone or hot metal, is failing. Telemetry simply confirms what your instincts have already detected.</p>' },
  { type: 'slide', title: '90. Day 30 - Final Readiness', content: '<p>You have absorbed the safety protocols, thermodynamics, material science, and digital logic. Tomorrow, you step onto the floor not as an apprentice, but as the Guardian of the Sovereign AI Infrastructure.</p><div class="tech-box mt-4"><strong>[AI Video Prompt]</strong> Epic 4k drone shot flying backwards down a massively long, perfectly clean data center aisle...</div>' },
  // QUIZ 10
  { type: 'quiz', q: 'What is the significance of the ASHRAE TC 9.9 \'W4\' class?', options: ['It dictates that water must be freezing.', 'It is the global guideline allowing liquid cooling supply water to reach up to 45°C, optimizing chiller-less data centers.', 'It refers to the size of the pipe.'], correct: 1 },
  { type: 'quiz', q: 'What is the golden rule of CMMS documentation?', options: ['Only log major disasters.', 'If it wasn\'t logged, it wasn\'t done. Every action must be recorded for predictive history and legal audits.', 'Log it only if you have time.'], correct: 1 },
  { type: 'quiz', q: 'In the context of AI Data Centers, which principle is absolute?', options: ['Efficiency supersedes Reliability.', 'Reliability supersedes Efficiency. Uptime is the single most critical metric.', 'Speed of installation supersedes testing.'], correct: 1 }
];
