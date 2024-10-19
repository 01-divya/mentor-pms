// Fetch Teams and Mentors from the Backend
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:5000/teams')
        .then(response => response.json())
        .then(data => {
            const teamSelect = document.getElementById('team');
            data.forEach(team => {
                const option = `<option value="${team.id}">${team.name}</option>`;
                teamSelect.insertAdjacentHTML('beforeend', option);
            });
        });

    fetch('http://localhost:5000/mentors')
        .then(response => response.json())
        .then(data => {
            const mentorSelect = document.getElementById('mentor');
            data.forEach(mentor => {
                const option = `<option value="${mentor.id}">${mentor.name}</option>`;
                mentorSelect.insertAdjacentHTML('beforeend', option);
            });
        });
});

// Handle Mentor Allocation
document.getElementById('allocation-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const teamId = document.getElementById('team').value;
    const mentorId = document.getElementById('mentor').value;

    fetch('http://localhost:5000/allocate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teamId: teamId,
            mentorId: mentorId
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('allocation-result').textContent = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
