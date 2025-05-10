function ProgressBar({ currentStep, totalSteps = 3 }) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mt-6">
      {/* Progress label with percentage */}
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-white">Progress</span>
        <span className="text-sm font-medium text-white">
          Step {currentStep} of {totalSteps} ({Math.round(percentage)}%)
        </span>
      </div>

      {/* Progress bar with smooth animation */}
      <div className="w-full bg-white/20 rounded-full h-3 relative overflow-hidden shadow-inner">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-[#1784ad] to-teal-400 shadow-[0_0_10px_2px_rgba(23,132,173,0.4)] transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            transitionProperty: "width",
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
