import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#050810] px-6">
          <div className="text-center max-w-sm">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="font-mono text-xs text-[#4f8ef7] mb-2">// runtime error</p>
            <p className="text-[#6b7fa3] text-sm leading-relaxed mb-6">
              Something crashed. Try refreshing — it's usually a one-time hiccup.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl text-sm font-mono text-[#050810] font-semibold"
              style={{ background: "linear-gradient(135deg, #4f8ef7, #a78bfa)" }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
