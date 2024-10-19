const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let teams = [
    { id: 1, name: "Team Alpha", members: "John, Sarah, Tom", mentor: "None" },
    { id: 2, name: "Team Beta", members: "Alice, Bob, Mark", mentor: "None" }
];

let mentors = [
    { id: 1, name: "Dr. Emily Clarke", teams: [] },
    { id: 2, name: "Dr. Richard Smith", teams: [] }
];

// Get all teams
app.get('/teams', (req, res) => {
    console.log("GET /teams requested");
    res.json(teams);
});

// Get all mentors
app.get('/mentors', (req, res) => {
    console.log("GET /mentors requested");
    res.json(mentors);
});

// Assign mentor to a team
app.post('/allocate', (req, res) => {
    console.log("POST /allocate requested with body:", req.body);
    const { teamId, mentorId } = req.body;

    const selectedTeam = teams.find(team => team.id == teamId);
    const selectedMentor = mentors.find(mentor => mentor.id == mentorId);

    if (selectedTeam && selectedMentor) {
        selectedTeam.mentor = selectedMentor.name;
        selectedMentor.teams.push(selectedTeam.name);

        res.json({ message: `Mentor ${selectedMentor.name} assigned to ${selectedTeam.name}` });
    } else {
        res.status(400).json({ error: 'Invalid team or mentor ID' });
    }
});

const PORT = 5000; // You can change this to another port if needed
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // This should log when the server starts
});
