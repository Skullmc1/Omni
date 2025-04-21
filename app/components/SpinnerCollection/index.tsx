"use client";
import DNASpinner from "../spinners/DNASpinner";
import OrbitalSpinner from "../spinners/OrbitalSpinner";
import PulseSpinner from "../spinners/PulseSpinner";
import VortexSpinner from "../spinners/VortexSpinner";
import GradientSpinner from "../spinners/GradientSpinner";
import CircuitSpinner from "../spinners/CircuitSpinner";
import RippleSpinner from "../spinners/RippleSpinner";
import MatrixSpinner from "../spinners/MatrixSpinner";
import AtomSpinner from "../spinners/AtomSpinner";
import SpinnerCard from "./SpinnerCard";

const spinners = [
  { name: "DNA Helix", component: DNASpinner },
  { name: "Orbital", component: OrbitalSpinner },
  { name: "Pulse", component: PulseSpinner },
  { name: "Vortex", component: VortexSpinner },
  { name: "Gradient", component: GradientSpinner },
  { name: "Circuit", component: CircuitSpinner },
  { name: "Ripple", component: RippleSpinner },
  { name: "Matrix", component: MatrixSpinner },
  { name: "Atom", component: AtomSpinner },
];

export default function SpinnerCollection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Loading Spinners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {spinners.map((spinner, index) => (
          <SpinnerCard key={index} name={spinner.name}>
            <spinner.component />
          </SpinnerCard>
        ))}
      </div>
    </div>
  );
}
