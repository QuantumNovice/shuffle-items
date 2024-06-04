import React, { useState } from 'react';
import { Button, TextField, FormControl, FormLabel } from '@mui/material';
import { saveAs } from 'file-saver';

const App = () => {
  const [participants, setParticipants] = useState(''); // Input for participant list
  const [shuffledParticipants, setShuffledParticipants] = useState([]); // Shuffled list
  const [error, setError] = useState(null); // Error state

  const handleInputChange = (event) => {
    setParticipants(event.target.value);
    setError(null); // Clear error on input change
  };

  const shuffleParticipants = () => {
    if (!participants.trim()) {
      setError('Please enter a list of participants.');
      return;
    }

    const participantList = participants.split('\n').map((participant) => participant.trim());
    const shuffledList = participantList.sort(() => Math.random() - 0.5); // Random sort for shuffling
    setShuffledParticipants(shuffledList);
  };

  const exportCSV = () => {
    if (!shuffledParticipants.length) {
      setError('Please shuffle the participants first.');
      return;
    }

    const csvContent = shuffledParticipants.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'shuffled_participants.csv');
  };

  return (
    <div className="App">
      <h1>Participant Shuffler</h1>
      <FormControl fullWidth margin="normal">
        <FormLabel>List of Participants (One per line):</FormLabel>
        <TextField
          multiline
          minRows={4}
          maxRows={10}
          value={participants}
          onChange={handleInputChange}
          error={!!error} // Set error helper text if error exists
          helperText={error}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={shuffleParticipants}>
        Shuffle Participants
      </Button>
      {shuffledParticipants.length > 0 && (
        <div>
          <h2>Shuffled Participants:</h2>
          <ul>
            {shuffledParticipants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
          <Button variant="contained" color="secondary" onClick={exportCSV}>
            Export Shuffled List as CSV
          </Button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
