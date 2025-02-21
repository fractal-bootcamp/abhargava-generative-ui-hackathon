# Thirst Trap Application

A simple app that uses the Hume API to generate a voice assistant that you talk to. Messages appear on the left. You are to have a conversation with the assistant and try not to laugh during the whole time. You can select from different configuratinos as you see fit from the dropdown (these will load different configuration models). 

## Laughter Detection

We render the person's webcam in the right side of the screen. We use the Google MediaPipe Face Mesh model to detect the person's facial landmarks. We then use these landmarks to detect if the person is laughing. If they laugh, the game ends. 



