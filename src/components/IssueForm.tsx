import React, { useState } from "react";

export default function IssueForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');

  const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

  };

  return (
    <form>
      <div>
        <label>Describe el problema: </label>
        <input
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <div>
        <button type="submit" disabled={loading}>En</button>
      </div>
    </form>
  );
};
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

