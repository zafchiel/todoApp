import {
  defineConfig,
  presetUno,
  presetWind,
  presetIcons,
  presetWebFonts,
} from "unocss"
import { presetHeroPatterns } from "@julr/unocss-preset-heropatterns"

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetIcons(),
    presetHeroPatterns(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: "Satoshi",
      },
    }),
    // ...custom presets
  ],
})
