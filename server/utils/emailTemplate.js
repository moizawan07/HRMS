const generateInviteEmail = ({ companyName,  companyLogo, link }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 10px;">
      <img src="${companyLogo}" alt="Company Logo" style="width: 100px; margin-inline: auto; height: 80px; object-fit: cover; border-radius: 10px 10px 0 0;" />
      <h2 style="color: #333;">You're invited to join ${companyName}!</h2>
      <p>This ${companyName} is the world fastest growing complany right now</p>
      <a href="${link}" style="display: inline-block; margin-top: 20px; background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Verify
      </a>
    </div>
  `;
};

module.exports = { generateInviteEmail };
