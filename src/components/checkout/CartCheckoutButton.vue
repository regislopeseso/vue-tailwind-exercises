<template>
  <button
    class="relative flex items-center gap-2 text-md font-bold uppercase group h-2.5"
  >
    <span class="z-10 hover:text-blue-400">Continue</span>

    <span
      class="inline-block w-8 h-0.5 bg-blue-400 group-hover:w-6 transition-all duration-150"
    ></span>

    <span
      class="absolute right-0 top-[50%] translate-y-[-50%] w-3 h-0.5 bg-blue-400 group-hover:rotate-45 origin-right transition-all duration-150"
    ></span>

    <span
      class="absolute right-0 top-[50%] translate-y-[-50%] w-3 h-0.5 bg-blue-400 group-hover:-rotate-45 origin-right transition-all duration-150"
    ></span>
  </button>
</template>
