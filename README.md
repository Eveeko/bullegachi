![default_happy_2](https://github.com/user-attachments/assets/964fcff0-cf01-4055-9a4a-0a65f33cb166)
# Bullegachi
A Bullet Kin inspired companion for your desk and pc!

![jsbadge](https://img.shields.io/badge/Made%20with-grey?style=for-the-badge&logo=javascript) ![electronbadge](https://img.shields.io/badge/built%20with%20-grey?style=for-the-badge&logo=electron&logoColor=cyan) ![commitbadge](https://img.shields.io/github/commit-activity/m/Eveeko/bullegachi?style=flat-square)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
___
This project has taken around 9 months *(mostly due to procrastination and my irl job)* to complete. I have never made a project like this before, and I am honestly very happy with the outcome. Therefore, I will likely end up designing a second and possibly further iterations of this project that encompass the rest of the Bullet Kin family in the coming future.

#### This is a 2 part project:
1. **Part one** consists of the `physical hardware` which is a bullet kin shell with electronics inside(bullegachi).
|
2. **Part two** consists of the `software` which is a tamagotchi inspired desktop companion that is directly based off and interacts with the bullegachi made in part one.

Due to the nature of this repository I will be housing `part two` on this page as it seems the most fitting.<br>
`part one` will be on [my site]() where I go into detail on the design process and my method of assembly.

## Bullegachi Program.
Feed, care, and fight! for your very own BulletPal with this desktop companion app designed to pair with your BulletPal figure!

- **One-click install:** <br>
  └─ Extracts and installs the application on your device and creates a start menu shortcut for you all at once!
- **Auto-update out of the box:** <br>
  └─ Will *automagically* prompt you if a new version is found on startup and if you wish to install or skip.
 - **Pairing to BulletPal:** <br>
  └─ Through the use of a extremely violent manipulation of gunpowder! Bullegachi is able to link together with your BulletPal figure itself!

### Features of your Bullegachi:
- **Stomach**, causing hunger and even starvation!
- **Heart**, you only get 3 of them so don't lose em **x_x**
- **Energy**, a lack of this can cause severe performance issues!
- **Level**, your only reason to exist.. it must. go. up.
> don't let it see you look away.

---

The Bullegachi desktop program is written in a mix of (`javascript`, `html` and `css`) and is utilizing the [Electron](https://www.electronjs.org/) framework for the graphical and windows interface (a window, [tray menu](https://www.electronjs.org/docs/latest/api/tray), notifcations, etc).

The application can be used as a standalone app where it does not interact with a BulletPal on the network *OR* it can work in parity with a BulletPal connected to the same network. <br>
> Use the **Tray Menu** to connect to the BulletPal on the local network. Bullegachi will automatically attempt to reconnect to a local Pal once you have established connection once prior, if it fails it will disable        the auto-reconnect function until you manually reconnect again.

## Gameplay

The core gameplay loop is:<br>
───────────────────┘<br>
`Battle for Food` - to maintain your virtual Pal's hunger stat.<br>
`Collect Items` - to power up your Pal in various ways.<br>
`Keep the Pal Alive` - as long as you can!!<br>
────────────────────

## Future Content

Below are potential features or changes I want to add/make in the future.

* In-game **Bullenomicon**! *(gives lore and stats on anything in the entire app)*
* Entire revamp of Battle system. (generate a floor with random tiles that lead to a exit and each tile can be blank, fight or loot)
* **Achievements** for Pal level and item discoveries.

## Attributions

Tutorial Background Music- [SethMakesSounds](https://www.patreon.com/sethmakessounds)  
Bullet Kin Character- [Dodge Roll](https://www.enterthegungeon.com/)  
Sfx Generator Software- [ChipTone](https://sfbgames.itch.io/chiptone)  
Sprites and all Code designed by- [Eveeko](https://github.com/Eveeko)  
GlassTTY Font by- [svofski](https://github.com/svofski/glasstty)

Made with ❤️ by Eveeko
