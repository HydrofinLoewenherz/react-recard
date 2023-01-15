# Recard

Recard is a web-app for creating and learning decks of cards. Cards are simple question-answer sheets that can be learned.
The app keeps track of the learning progress and shows responsive graphs for it.

**See the app [here on GitHub Pages][pages].**

## Considerations

- **Target domain**: Anyone who wants to memorize pieces of information, but specifically MINT students because of the LaTeX integration
- **Application class**: Tool (tracker) 
- **Senses used**: Motory skills (shake-api)
- **Addressed part of memory**: Long-term semantic memory

## Score

The [Lighthouse][lighthouse] score for the apps frontpage.

![lighthouse_score.png](docs%2Flighthouse_score.png)

## Features

Every feature of the app has a person responsible for it. This person created most or all of it.

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Paul</th>
      <th>Rico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>:key: Multi-user authentication</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:muscle: Password and username strength checker</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:raising_hand: User creation</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:clipboard: User sessions</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:floppy_disk: Deck save in Localstorage</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:lock: Localstorage encryption with AES</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:dizzy_face: Obfuscate localstorage keys</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:books: Deck creation/edit/delete</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:black_joker: Card creation/edit/delete</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:pencil2: Log aggregation of learning progress</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:minidisc: Efficient saving of logs</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:chart_with_upwards_trend: Graphical display of learning progress</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:wave: Shake-API creation and integration</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:fu: Swipe-API integration</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:twisted_rightwards_arrows: Page routing</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:u55b6: <a href="https://katex.org/">KaTeX</a>-support in cards</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:star: Material-UI integration</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:chocolate_bar: Responsive Appbar</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:trollface: Initial seeding of decks and cards</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:flower_playing_cards: Responsive and reactive Card-UI</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:performing_arts: Themes (auto-/light-/darkmode) support</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:eyeglasses: Support `prefers-color-scheme` for themes</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:newspaper: Open Graph Protocol support</td>
      <td>:heavy_check_mark:</td>
      <td></td>
    </tr>
    <tr>
      <td>:video_game: Gamification with progress bar</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>:envelope: Import/Export decks</td>
      <td></td>
      <td>:heavy_check_mark:</td>
    </tr>
  </tbody>
</table>

## Screenshots

<div style="display: flex; justify-content: center; align-items: center;">
    <img height="400" alt="Login page on iPhone 12 Pro" src="https://user-images.githubusercontent.com/19890613/212549792-51496145-e4fd-4537-a29c-64c193f0af52.png">
    <img height="400" alt="Homepage on iPhone 12 Pro" src="https://user-images.githubusercontent.com/19890613/212549811-7c0b8802-a553-4138-ab6b-8873d27c3c32.png">
    <img height="400" alt="Homepage on desktop" src="https://user-images.githubusercontent.com/19890613/212549832-0b8ebe1c-6ff7-4f7b-a910-25ec8796c3dd.png">
    <img height="400" alt="Learn page on iPhone 12 Pro" src="https://user-images.githubusercontent.com/19890613/212549854-4fc4db69-c985-4837-87b6-478e25077d35.png">
    <img height="400" alt="Learn latex card on iPhone 12 Pro" src="https://user-images.githubusercontent.com/19890613/212549857-e0925e8d-a342-4d28-8c88-c149a69505c3.png">
    <img height="400" alt="Deck manage page on desktop" src="https://user-images.githubusercontent.com/19890613/212549864-31384b79-e0a8-473f-83d7-e50f82ce642f.png">
    <img height="400" alt="Log page on iPhone 12 Pro" src="https://user-images.githubusercontent.com/19890613/212549870-4feb91db-a05c-4c4f-b3be-69952ada9b4e.png">
</div>

## Authors

The project was created by [Rico Münch (uozjn)][rico-github] and [Paul Wagner (ujhtl)][paul-github].

## Notes

The app icon is the Material-UI `Styles` icon. We do not own that icon, it is simply the chosen placeholder for this app
as it is not used commercially.

[pages]: https://hydrofinloewenherz.github.io/react-recard/ 'Recard on GitHub Pages'
[lighthouse]: https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=de 'lighthouse extension'
[paul-github]: https://github.com/HydrofinLoewenherz 'ujhtl'
[rico-github]: https://github.com/cryeprecision 'uozjn'
