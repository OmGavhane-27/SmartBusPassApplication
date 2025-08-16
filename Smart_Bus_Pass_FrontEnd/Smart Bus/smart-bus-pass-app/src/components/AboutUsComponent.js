import React from "react";

const AboutUsComponent = () => {
  const containerStyle = {
    maxWidth: "1100px",
    margin: "100px auto",
    background: "#1b2a41",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#f3f4f6",
  };

  const pageStyle = {
    backgroundColor: "#fdf4e3", 
    minHeight: "100vh",
    padding: "20px",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#ffffff",
    marginBottom: "30px",
    fontSize: "40px",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    lineHeight: "1.8",
    color: "#d1d5db",
    fontSize: "16px",
    marginBottom: "20px",
  };

  const teamHeadingStyle = {
    marginTop: "40px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#ffffff",
    borderBottom: "1px solid #374151",
    paddingBottom: "10px",
    marginBottom: "30px",
    textAlign: "center",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginBottom: "30px",
  };

  const cardStyle = {
    background: "#27334a",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    width: "180px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const avatarStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #fa5541",
    marginBottom: "12px",
  };

  const memberNameStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px",
  };

  const memberRoleStyle = {
    fontSize: "14px",
    color: "#cbd5e1",
  };

  const teamMembers = [
    { name: "Himabindu", role: "Frontend & Backend Developer", img: "https://placehold.co/100x100?text=HB" },
    { name: "Pratiksha", role: "Frontend Developer", img: "https://placehold.co/100x100?text=PR" },
    { name: "Om", role: "Backend Developer", img: "https://placehold.co/100x100?text=OM" },
    { name: "Rutukesh", role: "UI/UX Designer", img: "https://placehold.co/100x100?text=RK" },
    { name: "Prajwal", role: "Project Coordinator", img: "https://placehold.co/100x100?text=PJ" },
  ];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headingStyle}>About Us</h1>
        <p style={paragraphStyle}>
          Welcome to our Smart Bus Pass System! We're dedicated to making public
          transportation smarter, more efficient, and more accessible. Our
          platform enables passengers to generate, manage, and validate bus
          passes with ease.
        </p>

        <p style={paragraphStyle}>
          Our mission is to digitize the bus pass system to reduce paper usage
          and long queues. We believe in using technology to make everyday tasks
          more convenient and user-friendly.
        </p>

        <div style={teamHeadingStyle}>Our Team</div>

        <div style={rowStyle}>
          {teamMembers.slice(0, 3).map((member, index) => (
            <div key={index} style={cardStyle}>
              <img src={member.img} alt={member.name} style={avatarStyle} />
              <div style={memberNameStyle}>{member.name}</div>
              <div style={memberRoleStyle}>{member.role}</div>
            </div>
          ))}
        </div>
        
        <div style={rowStyle}>
          {teamMembers.slice(3).map((member, index) => (
            <div key={index + 3} style={cardStyle}>
              <img src={member.img} alt={member.name} style={avatarStyle} />
              <div style={memberNameStyle}>{member.name}</div>
              <div style={memberRoleStyle}>{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
