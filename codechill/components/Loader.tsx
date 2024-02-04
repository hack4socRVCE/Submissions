"use client";
import React from "react";
import SparklesCore from "@/utils/SparklesCore";

export function SparklesPreview() {
  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="f1d6cf"
        />
      </div>
      <h1 className="md:text-7xl text-[#f1d6cf] text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        IsWiseChoice
      </h1>
    </div>
  );
}
