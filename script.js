document.getElementById("jobForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent refresh

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const position = document.getElementById("position").value;
  const worktime = document.querySelector('input[name="worktime"]:checked')?.value;
  const message = document.getElementById("message").value.trim();

  // Validation check
  if (!name || !email || !position || !worktime) {
    alert("⚠️ Please fill in all required fields.");
    return;
  }

  // Send data to backend
  try {
    const response = await fetch("http://localhost:5000/api/applicants/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, position, worktime, message })
    });

    const result = await response.json();
    if (result.success) {
      console.log("✅ Application saved in DB");
    } else {
      console.error("❌ Error:", result.error);
    }
  } catch (err) {
    console.error("❌ Could not connect to backend:", err);
  }

  // Display applicant summary
  const outputDiv = document.getElementById("output");
  outputDiv.style.display = "block";
  outputDiv.innerHTML = `
    <h3>📋 Application Summary</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Position:</strong> ${position}</p>
    <p><strong>Work Time:</strong> ${worktime}</p>
    <p><strong>Reason:</strong> ${message || "Not provided"}</p>
    <hr/>
    <h3>📍 Available Job Vacancies</h3>
    <div id="jobList">Loading jobs...</div>
  `;

  // Fetch available jobs
  try {
    const jobsRes = await fetch("http://localhost:5000/api/jobs/all");
    const jobs = await jobsRes.json();

    let jobHTML = "";
    if (jobs.length === 0) {
      jobHTML = "<p>No jobs available at the moment.</p>";
    } else {
      jobs.forEach(job => {
        jobHTML += `
          <p>
            <strong>${job.position}</strong> (${job.workTime})  
            <br/>Vacancies: ${job.vacancies}  
            <br/>Location: (${job.location.lat}, ${job.location.lng})
          </p>
        `;
      });
    }
    document.getElementById("jobList").innerHTML = jobHTML;
  } catch (err) {
    document.getElementById("jobList").innerHTML = "<p>⚠️ Could not load jobs.</p>";
  }

  // Optional: Reset form
  this.reset();
});
