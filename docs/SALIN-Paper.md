# SALIN: A VOICE TRANSCRIPTION AND TRANSLATION WEB APP FOR ENGLISH, FILIPINO, AND BISAYA

**Dela Cruz, Cresadel M.**

**November 2026**

---

# SALIN: A VOICE TRANSCRIPTION AND TRANSLATION WEB APP FOR ENGLISH, FILIPINO, AND BISAYA

A Project Paper
Presented to
Mr. James Bernard C. Febrio
Instructor of the Institute of Computer Studies
Tangub City Global College

In Partial Fulfillment of the Course

Multimedia Systems

Dela Cruz, Cresadel M.

November 2026

---

## Table of Contents

- Introduction
- Project Overview
- How It Works
- Narrative Flow
- Documentation
- Testing
- Feature Comparison: Google Translate and Salin
- Conclusion
- References
- Appendix: Complete Feature List

---

## Introduction

**Statement:** Salin helps students, workers, and families to transcribe spoken words into text and translate spoken or typed words between English, Filipino, and Bisaya every day.

**Problem:** Many people speak English, Filipino, and Bisaya in the same day, but most translators handle Bisaya poorly and do not let the user speak, listen, and save the result in one app. Writing down what was said, typing each sentence into a translator, and copying the result is slow.

**Who it helps:** Students, workers, and families who talk across these three languages, and anyone who needs a transcribed and translated copy of what was said.

**Goal:** The user first chooses the language they will speak and the language they want. The app then lets the user speak into the microphone and transcribes the speech into text, or type the text. It translates the text into the chosen language, reads it aloud in a female voice when the device has one, and lets the user fix, copy, save, or download it. It is a web app made with HTML, CSS, and JavaScript that runs in a web browser (Google Chrome or Microsoft Edge is recommended) on a laptop or a phone.

## Project Overview

The app was made with HTML, CSS, and JavaScript. It uses the browser's Web Speech API (Mozilla, n.d.-b) for English and Filipino speech recognition (transcription) and for reading aloud, the MediaRecorder API (Mozilla, n.d.-a) to save the audio, and free online translation services, mainly MyMemory (Translated, n.d.) with a backup service. For Bisaya speech, the app records the audio and sends it to the public SapinSapin halohalo demo on Hugging Face (SapinSapin AI, 2026a), which uses a Cebuano speech recognition model called `whisper-small-pld-ceb` (SapinSapin AI, 2026b). The app calls the demo through its Gradio API (Gradio, n.d.). For reading aloud, the app picks a female voice from the voices installed on the device, and raises the pitch of the voice when there is none. The saved translations and corrections are kept in the browser's local storage (Mozilla, n.d.-c) on the same device. It works best in Google Chrome or Microsoft Edge. The code was written in Visual Studio Code and tested with the Live Server extension.

The new version of the app has these changes. The user must now choose both the language to speak and the language wanted before the Record, Translate, and Swap buttons work. Both language lists start with "Select language" instead of assuming English. Auto-detect was removed because it could transcribe Bisaya speech as English or Filipino. Bisaya voice is now transcribed by an online Cebuano speech recognition service instead of falling back to Filipino. Read aloud uses a female voice when the device has one. Very long text without punctuation is split into small parts so that the translation service can handle it. The offline phrasebook ignores capital letters and punctuation, so "Hello!" works. Pressing Translate twice on the same text no longer adds a copy to the Saved list. The app shows clear messages when no speech is heard, when the free daily limit is reached, and when the Bisaya service cannot be reached. The buttons have stronger colors for easier reading, the text boxes and tabs have labels for screen readers, and the header fits small phone screens. The footer also explains that Bisaya recordings are sent to an online service.

## How It Works

The app shows what goes in, what happens inside, and what comes out. Figure 1 and Table 1 show the input, the process, and the output of the system.

**Figure 1. Input, Process, and Output (IPO) Diagram**

Figure 1 shows the input, the process, and the output of Salin. The user's voice or typed text goes in, Salin transcribes the speech and translates the text, and the translation, the saved list, the voice, and the files come out.

Users open the app and allow the microphone, then choose the language they will speak (English, Filipino, or Bisaya) and the language they want. Both choices are required before the Record, Translate, and Swap buttons become active. They click Record and speak, or type in the box, and the spoken words are transcribed into text. For English and Filipino, the browser transcribes the speech. For Bisaya, the app records the audio and sends it to the online Cebuano speech service. They click Stop when done, and the app translates by itself, or they click Translate. Users then check the translation. If a word is wrong, they edit it in the box and click Save my correction, click Read aloud to hear it in a female voice, or click Copy to copy it. Each translation is saved automatically with its date, and the Saved tab shows the list, where users can mark a favorite with the star or delete an item. Finally, users choose a file type (Text, Word, PDF, or Subtitles) and click Download. Download audio saves the recording, the A− and A+ buttons change the text size, and the Dark mode button changes the colors.

**Table 1. Input, Process, and Output**

| Input (what goes in) | Process (what happens inside) | Output (what comes out) |
|---|---|---|
| The user's voice, picked up by the microphone, or text typed in the box. The user's choice of language to speak (English, Filipino, or Bisaya) and language wanted. Clicks on Record, Translate, Read aloud, Copy, Save my correction, and Download. The file type and light or dark mode. | English and Filipino speech are transcribed by the browser. Bisaya speech is recorded, uploaded, and transcribed by the online Cebuano speech service. Long text is split into small parts and translated with the online service. A correction saved by the user is used first, and a small built-in phrasebook is used when there is no internet. | The translation in an editable box. A Saved list with the date of each translation and a star for favorites. The text read aloud in a female voice when the device has one. A Download button that saves a text, Word, PDF, or subtitle (.srt) file, and a button that saves the recording as audio. |

## Narrative Flow

This section follows one student from opening Salin to downloading the result. It uses the sentence from Test 3 in Table 2.

**Step 1: Open the app.** The student opens Salin in Google Chrome or Microsoft Edge and allows the microphone. Both language lists show "Select language." The student chooses English as the language to speak and Bisaya as the language wanted. Only then do the Record, Translate, and Swap buttons become active.

**Step 2: Speak.** The student clicks Record and says, "Every morning, I wake up early, pack my things, and get ready for school." The Record button changes to a red Stop button, and the message says "Listening… speak now."

**Step 3: Transcribe.** Because the chosen language is English, Salin uses the browser's speech recognition and the spoken sentence appears in the left box. The student can also type the sentence in the box instead of speaking.

**Step 4: Translate.** When the student clicks Stop, Salin translates by itself because Auto translate while recording is checked. The student can also click Translate. Long text is split into small parts and translated with the online service. A correction saved earlier is used first, and the built-in phrasebook is used when there is no internet. The Bisaya translation appears in the right box.

**Step 5: Check and correct.** The student reads the translation and edits any wrong word in the box, then clicks Save my correction. Salin uses this correction the next time the same text is translated.

**Step 6: Listen.** The student clicks Read aloud, and Salin reads the text in a female voice when the device has one. A Stop button appears while the text is being read.

**Step 7: Save.** Salin saves the translation automatically with its date. The Saved tab lists it with the language pair, and the student can mark it with the star or delete it.

**Step 8: Download.** The student chooses Text, Word, PDF, or Subtitles in the Download as list and clicks Download. Download audio saves the recording. At any time, the A− and A+ buttons change the text size, and the Dark mode button changes the colors.

**If the student speaks Bisaya instead:** In Step 1, the student chooses Bisaya as the language to speak. In Step 2, the message says "Listening… speak Bisaya." When the student clicks Stop, the app uploads the recording to the online Cebuano speech service and shows "Transcribing Bisaya… the first run can take a few minutes." The Bisaya text then appears in the left box and is translated into the chosen language. This step needs internet.

## Documentation

**Figure 2. Main Screen of the New Version**

Figure 2 shows the main screen of the new version with empty text boxes. Both language lists show "Select language," and the Record, Translate, and Swap buttons are disabled until both languages are chosen. The Record, Read aloud, Save my correction, and Clear buttons are under the left box, and the Translate, Read aloud, and Copy buttons are under the right box.

**Figure 3. Language Choices for the Spoken or Typed Text**

Figure 3 shows the list of languages for the text of the user: Select language, English, Filipino, and Bisaya (Cebuano). Auto-detect is no longer in the list.

**Figure 4. Language Choices for the Translation**

Figure 4 shows the list of languages for the translation: Select language, English, Filipino, and Bisaya (Cebuano).

**Figure 5. English to Bisaya Translation**

Figure 5 shows an English sentence translated into Bisaya. The message below the buttons says "Done (online)" when the translation is finished.

**Figure 6. Reading the Text Aloud**

Figure 6 shows the app reading the text in the left box aloud. A Stop button appears, and the message says that the voice used is Microsoft Zira - English (United States).

**Figure 7. Choosing the Word File Download**

Figure 7 shows Word (.doc) chosen in the Download as list, and the Downloads panel of the browser with the files that were saved.

**Figure 8. Downloaded Word File**

Figure 8 shows the downloaded Word file opened in a word processor. It has the title Salin translations, the language pair, the original sentence, and the translation in bold.

**Figure 9. Dark Mode with PDF Download**

Figure 9 shows the dark mode of the new version with PDF chosen in the Download as list. The message below the buttons says to choose Save as PDF in the print window.

**Figure 10. Larger Text**

Figure 10 shows the app after the A+ button was clicked. The text and the buttons are bigger, and the Clear button moves to the next line to fit the screen.

**Figure 11. Smaller Text**

Figure 11 shows the app after the A− button was clicked. The text and the buttons are smaller, so more of the screen is empty.

**Figure 12. English to Filipino Translation**

Figure 12 shows the same English sentence translated into Filipino in the dark mode.

**Figure 13. Filipino to Bisaya Translation**

Figure 13 shows a Filipino sentence in the left box and its Bisaya translation in the right box, which the user can edit.

**Figure 14. Recording with Auto Translate**

Figure 14 shows the app while recording. The Record button changes to a red Stop button, and the message says "Listening… speak now." The spoken sentence appears in the left box and is translated by itself because Auto translate while recording is checked.

**Figure 15. Saved Translations**

Figure 15 shows the Saved tab. Each translation is listed with the language pair, the date and time, and the Favorite, Read aloud, and Delete buttons. Favorites only, Download all, Delete all, and Clear my corrections are at the top.

**Figure 16. Bisaya Voice Transcription**

Figure 16 shows the Bisaya voice transcription. The message says "Listening… speak Bisaya" while recording and "Transcribing Bisaya… the first run can take a few minutes" while the recording is sent to the online Cebuano speech service. The transcribed Bisaya text appears in the left box and is translated into the chosen language in the right box.

## Testing

Table 2 shows the thirteen tests that check the main features of the app: required language selection, transcription (speech to text) for English and Bisaya, translating, saving a correction, downloading a file, reading aloud, the saved list, the text size, and the comparison with Google Translate.

**Table 2. Test Cases and Results**

| Test | What You Tried | Expected Result | Actual Result | Pass or Fail |
|---|---|---|---|---|
| Test 1 | Open the app and check the language lists before choosing anything | Both lists show "Select language" and Record, Translate, and Swap are disabled | Both lists showed "Select language" and the three buttons were disabled until both languages were chosen | Pass |
| Test 2 | Choose English to speak and Bisaya to translate, click Record, and say an English sentence | The spoken words appear as text in the left box | The spoken sentence "Hi bro, what are you doing?" appeared in the left box | Pass |
| Test 3 | Choose English to Bisaya, type "Every morning, I wake up early, pack my things, and get ready for school.", and click Translate | A Bisaya translation appears in the right box | The Bisaya translation "Kada buntag, sayo kong momata, manghipos sa akong mga gamit, ug mangandam alang sa eskuylahan." appeared | Pass |
| Test 4 | Edit the translation, click Save my correction, then translate the same text again | The corrected version appears again | The corrected version appeared again when the same text was translated | Pass |
| Test 5 | Choose Word (.doc) and click Download | A file with the original text and the translation is saved on the computer | A Word file named translation.doc was downloaded | Pass |
| Test 6 | Choose English to Filipino, type the same sentence, and click Translate | A Filipino translation appears in the right box | A Filipino translation appeared in the right box | Pass |
| Test 7 | Choose Filipino to Bisaya, type a Filipino sentence, and click Translate | A Bisaya translation appears in the right box and the user can edit it | A Bisaya translation appeared in the right box | Pass |
| Test 8 | Type a sentence in the left box and click Read aloud | The text is read aloud in a female voice and the user can stop it | The text was read with the voice Microsoft Zira - English (United States) and a Stop button appeared | Pass |
| Test 9 | Turn on dark mode, choose PDF in the Download as list, and click Download | The print window opens so the user can choose Save as PDF | The message said to choose Save as PDF in the print window | Pass |
| Test 10 | Click the A+ button and then the A− button | The text and the buttons become bigger and then smaller | The text and the buttons became bigger and then smaller | Pass |
| Test 11 | Translate a few sentences and open the Saved tab | Each translation is listed with the language pair, the date, and the buttons | The Saved tab listed the translations with the language pair, the date and time, and the Favorite, Read aloud, and Delete buttons | Pass |
| Test 12 | Choose Bisaya to speak and English to translate, click Record, and say a Bisaya sentence such as "Maayong buntag." | The app records the Bisaya voice, shows the online transcription status, places the Bisaya text in the left box, and shows the English translation | The app recorded the Bisaya voice, showed "Transcribing Bisaya…," placed the Bisaya text in the left box, and showed the English translation | Pass |
| Test 13 (comparison) | Translate "Hi, good evening." from English to Bisaya in Salin and in Google Translate, fix one word, then save and download the result | Both give a Bisaya translation. Salin has features that Google Translate does not have | Both gave a Bisaya translation. Only Salin reused my correction, saved the result as a Word file, and saved my recording | Pass |

## Feature Comparison: Google Translate and Salin

Google Translate (Google, n.d.-a) has many more languages, including Cebuano and Filipino, and can translate whole Word, PDF, PowerPoint, and Excel files (Google, n.d.-b). A signed-in user can also save translations with a star (Google, n.d.-a).

In comparison, Salin has only English, Filipino, and Bisaya, but all three are in one small page. The user speaks and Salin transcribes the speech, or the user types, then edits the translation and saves it as a correction that Salin reuses, hears it in a female voice, and downloads it as a text, Word, PDF, or subtitle file. The recording can also be saved as audio, and every translation is saved with its date in the browser with no account. Bisaya voice input is supported through an online Cebuano speech recognition service, so it needs internet but does not fall back to Filipino.

## Conclusion

**What works.** Salin lets the user choose the language to speak and the language wanted, speak and have the speech transcribed into text, or type, and get a translation in English, Filipino, or Bisaya that can be edited, heard in a female voice, saved, and downloaded as a text, Word, PDF, or subtitle file. It now transcribes Bisaya voice through an online Cebuano speech recognition service, and it reuses the user's own corrections, unlike Google Translate.

**Current limitations.** Bisaya speech recognition depends on an online service and an internet connection, and the first request can take a few minutes while the model loads. Bisaya read-aloud still uses a Filipino voice when no Cebuano voice is installed. The free online translation service also needs internet, and saved translations stay in the browser on the same device. An optional offline AI translation model exists for testing, but it needs a large download.

**Next steps.** The next step is an on-device Cebuano speech recognition model, a real Bisaya text-to-speech voice, and a better offline translation model so the app can work without internet.

## References

Costa-jussà, M. R., et al. (2022). *No Language Left Behind: Scaling human-centered machine translation.* arXiv. https://arxiv.org/abs/2207.04672

Google. (n.d.-a). *Google Translate.* Retrieved November 11, 2026, from https://translate.google.com

Google. (n.d.-b). *Translate documents & websites.* Google Translate Help. Retrieved November 11, 2026, from https://support.google.com/translate/answer/2534559

Gradio. (n.d.). *Gradio documentation.* Retrieved November 14, 2026, from https://www.gradio.app/docs

Hugging Face. (n.d.). *Transformers.js.* Retrieved November 14, 2026, from https://huggingface.co/docs/transformers.js

Mozilla. (n.d.-a). *MediaRecorder.* MDN Web Docs. Retrieved November 11, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

Mozilla. (n.d.-b). *Web Speech API.* MDN Web Docs. Retrieved November 11, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

Mozilla. (n.d.-c). *Web Storage API.* MDN Web Docs. Retrieved November 11, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

SapinSapin AI. (2026a). *Halohalo Dashboard* [Web application]. Hugging Face Spaces. https://huggingface.co/spaces/sapinsapin/halohalo-dashboard

SapinSapin AI. (2026b). *whisper-small-pld-ceb* [Automatic speech recognition model]. Hugging Face. https://huggingface.co/sapinsapin/whisper-small-pld-ceb

Translated. (n.d.). *MyMemory: API technical specifications.* Retrieved November 11, 2026, from https://mymemory.translated.net/doc/spec.php

---

## Appendix: Complete Feature List

### Languages

- English, Filipino, and Bisaya (Cebuano).
- All six directions: English to Filipino, English to Bisaya, Filipino to English, Filipino to Bisaya, Bisaya to English, Bisaya to Filipino.
- Explicit language selection at startup: both From and To show "Select language" and have no default.
- Record, Translate, and Swap are disabled until both languages are chosen.
- Swap button exchanges From and To and moves the translation to the input box.
- Auto-detect was removed so the app cannot guess the wrong language and transcribe Bisaya speech as English.

### Voice Input and Transcription

- Record/Stop microphone button.
- English and Filipino use the browser's Web Speech API.
- Bisaya uses an online Cebuano speech recognition service: the SapinSapin halohalo demo on Hugging Face, using the `whisper-small-pld-ceb` model.
- The app records the Bisaya audio, uploads it, waits for the transcription, and places the text in the left box.
- Status messages: "Listening… speak Bisaya," "Uploading your Bisaya voice…," and "Transcribing Bisaya… the first run can take a few minutes."
- Three-minute timeout and clear error messages if the online service is unreachable.
- MediaRecorder captures the audio so it can be downloaded.
- Auto translate after recording, or while recording for English and Filipino.

### Translation

- Free online translation: MyMemory with a backup online service; bad results are detected and retried.
- Long text is split into smaller parts before translation.
- Built-in offline phrasebook for common expressions when there is no internet.
- Personal corrections saved in the browser and reused first for the same text.
- Optional developer-only offline AI translation model (NLLB) via Transformers.js; needs a large model download.
- Translation cache for repeated text.
- Same-language selections return the same text.

### Output and Actions

- Editable translation box.
- Copy translation and Clear all.
- Save my correction.
- Read aloud with a preferred female voice; if no female voice is installed, the pitch is raised.
- Bisaya read-aloud falls back to a Filipino voice when no Cebuano voice is installed.
- Stop while reading aloud.
- Download as Text (.txt), Word (.doc), PDF (print window), or Subtitles (.srt).
- Download the recorded audio (.webm, .ogg, or .m4a).
- Saved list with language pair, date and time, favorites, read aloud, delete, favorites-only filter, download all, delete all, and clear corrections.
- Keeps up to 200 saved translations.
- Dark/light mode and A+/A− text size, both remembered in the browser.
- Accessibility: labels for screen readers, roles, status announcements, and focus outlines.
- Responsive layout for phones.
- Privacy note: Bisaya recordings are sent to the public SapinSapin demo; English and Filipino use the browser's speech service, which may also be online.
