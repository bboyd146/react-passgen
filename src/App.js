import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faClipboard } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [passwordGenerated, setPasswordGenerated] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');


  const generatePassword = () => {
    let userChoices = '';
    const numbersChars = '0123456789';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specChars = '!#$%&\'"()*+,-./:;<=>?@[\\]^_`{|}~';

    if (passwordLength < 8 || passwordLength > 128) {
      setModalContent('Password length must be between 8 and 128 characters!');
      setShowModal(true);
      return;      
    }

    if (!includeNumbers && !includeLowercase && !includeUppercase && !includeSpecialChars) {
      setModalContent('Password length must be between 8 and 128 characters!');
      setShowModal(true);
      return;
    }

    if (includeNumbers) userChoices += numbersChars;
    if (includeLowercase) userChoices += lowerChars;
    if (includeUppercase) userChoices += upperChars;
    if (includeSpecialChars) userChoices += specChars;

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += userChoices.charAt(Math.floor(Math.random() * userChoices.length));
    }
    setPassword(generatedPassword);
    setPasswordGenerated(true)
  };

  const copyToClipboard = async  () => {
    await navigator.clipboard.writeText(password);
    setModalContent('Password copied to clipboard!');
    setShowModal(true);
    return;
  };

  return (
    <div className="wrapper">
      <header>
        <h1>Password Generator</h1>
      </header>
      <div className="card">
        <div className="card-header">
          <h2>Generate a Password</h2>
        </div>
        <div className="card-body">
          <div className="password-container">
            <textarea
              readOnly
              id="password"
              placeholder="Your Secure Password"
              aria-label="Generated Password"
              value={password}
            ></textarea>
            {passwordGenerated && (
              <FontAwesomeIcon
                icon={faClipboard}
                className="clipboard-icon"
                onClick={copyToClipboard}
              />)}

          </div>
        </div>
        <div className="card-footer">
          <label className="option-label">
            Password Length:
            <input
              type="number"
              min="8"
              max="128"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </label>
          <div className="toggle-container">
            <label className="option-label">
              Include Numbers:
              <FontAwesomeIcon
                icon={includeNumbers ? faToggleOn : faToggleOff}
                onClick={() => setIncludeNumbers(!includeNumbers)}
                className={includeNumbers ? 'toggle-on' : 'toggle-off'}
              />
            </label>
            <label className="option-label">
              Include Lowercase Letters:
              <FontAwesomeIcon
                icon={includeLowercase ? faToggleOn : faToggleOff}
                onClick={() => setIncludeLowercase(!includeLowercase)}
                className={includeLowercase ? 'toggle-on' : 'toggle-off'}
              />
            </label>
            <label className="option-label">
              Include Uppercase Letters:
              <FontAwesomeIcon
                icon={includeUppercase ? faToggleOn : faToggleOff}
                onClick={() => setIncludeUppercase(!includeUppercase)}
                className={includeUppercase ? 'toggle-on' : 'toggle-off'}
              />
            </label>
            <label className="option-label">
              Include Special Characters:
              <FontAwesomeIcon
                icon={includeSpecialChars ? faToggleOn : faToggleOff}
                onClick={() => setIncludeSpecialChars(!includeSpecialChars)}
                className={includeSpecialChars ? 'toggle-on' : 'toggle-off'}
              />
            </label>
          </div>
          <button className="btn" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Error Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '300px', 
            padding: '20px'
          }
        }}
      >
        <h2>Error</h2>
        <p>{modalContent}</p>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default PasswordGenerator;
