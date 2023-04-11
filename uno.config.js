import { defineConfig, presetUno, presetWind, presetIcons } from "unocss"

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetIcons(),
    // ...custom presets
  ],
})
