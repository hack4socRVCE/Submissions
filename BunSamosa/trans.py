import pickle
import os.path
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

def authenticate_google_calendar():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    return build('calendar', 'v3', credentials=creds)

def get_google_meet_transcript(calendar_service, event_id):
    """Retrieve Google Meet transcript from a calendar event."""
    try:
        event = calendar_service.events().get(calendarId='primary', eventId=event_id).execute()
        if 'transcription' in event:
            return event['transcription']
        else:
            return None
    except Exception as e:
        print(f"Error retrieving transcript: {e}")
        return None

def save_transcript_to_txt(transcript, file_path='transcript.txt'):
    """Save transcript to a text file."""
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(transcript)

def main():
    calendar_service = authenticate_google_calendar()

    meet_event_id = 'your_meet_event_id'

    transcript = get_google_meet_transcript(calendar_service, meet_event_id)

    if transcript:
        save_transcript_to_txt(transcript)
        print(f"Transcript saved to transcript.txt")
    else:
        print("Transcript not found or error occurred.")

if __name__ == '__main__':
    main()
