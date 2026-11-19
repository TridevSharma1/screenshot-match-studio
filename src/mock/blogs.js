export const mockBlogs = [
  {
    id: "blog-1",
    title: "How Special Purpose Machines (SPMs) Slash Automotive Cycle Times by 70%",
    category: "Industrial Articles",
    date: "14 Jun 2025",
    author: "Shailesh Bhor",
    readTime: "6 min read",
    description:
      "An in-depth engineering breakdown of rotary dial indexing versus sequential machining in high-volume automotive powertrain component manufacturing.",
    content:
      "In modern tier-1 automotive manufacturing, high volume component machining cannot afford the sequential bottleneck of standard CNC machines. Special Purpose Machines (SPMs) combine multiple operations—drilling, reaming, chamfering, and thread tapping—into a single synchronized indexing cycle. By utilizing rigid multi-spindle headstocks, hydraulic self-centering chucks, and optimized cutting parameter presets, our clients regularly achieve cycle time compressions exceeding 60-75% while maintaining sub-8-micron repeatability across 100,000 unit production runs.",
    tags: ["SPM Design", "Cycle Time", "Automotive", "Rotary Indexing"],
    image: "/images/global-cnc-facility-hero.png",
  },
  {
    id: "blog-2",
    title: "Essential Daily & Weekly Preventative Maintenance Checklist for VMCs",
    category: "Machine Maintenance",
    date: "28 May 2025",
    author: "Mahesh Patil",
    readTime: "5 min read",
    description:
      "Prevent costly spindle bearing replacements and axis backlash with this practical machine shop preventative checklist.",
    content:
      "Unplanned spindle downtime can paralyze an entire production batch. Routine spindle runout monitoring, lubrication pressure audits, and wiping tool taper cones with lint-free solvent are simple yet non-negotiable disciplines. We outline key checkpoints: verifying way-lube oil reservoir levels, inspecting pneumatic pressure switches for the auto tool changer, testing axis backlash with dial test indicators, and ensuring continuous chip conveyor lubrication.",
    tags: ["Maintenance", "VMC", "Spindle Health", "Machine Shop Tips"],
    image: "/images/global-cnc-machining.png",
  },
  {
    id: "blog-3",
    title: "5-Axis CNC Machining vs 3+2 Positional: Selecting the Right Aerospace Strategy",
    category: "Latest CNC Technologies",
    date: "15 May 2025",
    author: "Sunil Shinde",
    readTime: "7 min read",
    description:
      "Understanding tool deflection, surface finish advantages, and collision management in complex 5-axis aerospace impellers and manifolds.",
    content:
      "When machining complex curved aerodynamic geometries like titanium blisks and hydraulic manifolds, choosing between continuous simultaneous 5-axis toolpaths and 3+2 indexed positional milling drastically impacts cutting tool longevity and cycle time. Positional 3+2 machining allows for shorter, stubbier end mills with minimal deflection and heavy metal removal rates, whereas continuous 5-axis is indispensable for blending aerodynamic continuous surfaces without visible witness lines.",
    tags: ["5-Axis", "Aerospace", "CAD/CAM", "Titanium Machining"],
    image: "/images/global-cnc-machining.png",
  },
  {
    id: "blog-4",
    title: "Mastering GD&T and Micro-Tolerance Machining in Hardened Tool Steels",
    category: "Manufacturing Tips",
    date: "02 May 2025",
    author: "Archana Kulkarni",
    readTime: "8 min read",
    description:
      "How ambient shop floor thermal fluctuations influence part geometry and how climate-regulated metrology guarantees aerospace compliance.",
    content:
      "Precision is not just a function of the machine tool; it is a discipline governed by thermodynamics and metrology. A 5-degree temperature swing across a 400 mm steel plate induces up to 6 microns of thermal expansion—exceeding tight tolerances before the part even leaves the chuck. In this guide, we review thermal growth compensation algorithms in modern CNC controllers, tool pre-setting standards, and temperature-controlled post-machining soaking cycles before CMM inspection.",
    tags: ["GD&T", "Quality Control", "Thermal Expansion", "CMM Inspection"],
    image: "/images/global-cnc-facility-hero.png",
  },
];

export default mockBlogs;
