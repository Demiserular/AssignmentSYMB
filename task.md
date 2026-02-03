# Online Bank Mini System 
## Objective

Develop and deploy a complete, working **Online Bank Mini System** with a focus on:

- Secure transaction handling
- Robust validation logic
- Clean and usable UI design
- Proper error handling
- Deployment to a live public URL

This assignment evaluates understanding of:

- Data modeling
- Transaction validation logic
- Backend functionality
- UI structure and usability
- Code quality and modular design

---

## Technology Stack

Node.js React

- All functional requirements are implemented
- UI requirements are fulfilled
- The application is publicly deployed
- Code is modular and readable

---

## Data Model Requirements

Implement an **Account** data model with the following fields:

| Field Name      | Type            | Description                                |
| --------------- | --------------- | ------------------------------------------ |
| `accountNo`     | String / Number | Unique Account ID                          |
| `holderName`    | String          | Account Holder’s Name                      |
| `balance`       | Number          | Current Account Balance                    |
| `isKYCVerified` | Boolean         | KYC Verification Status (`true` / `false`) |

---

## Mandatory Functional Requirements

### 1. Create Account

- Allow users to create a new bank account.
- Account number must be unique.
- Initial balance validation (no negative values).
- KYC status must be set during creation.

---

### 2. Deposit Money

- Allow user to deposit money into an existing account.
- Amount must be positive.
- Account must exist.
- Balance must update correctly.

---

### 3. Withdraw Money

- Allow user to withdraw money from an account.
- Amount must be positive.
- Account must exist.
- Must check sufficient balance before withdrawal.
- Display appropriate error if insufficient funds.

---

### 4. Transfer Money

Implement the core function:

This function **must enforce secure validations**:

- Sender account must exist.
- Receiver account must exist.
- Sender must be **KYC verified**.
- Sender must have **sufficient balance**.
- Transfer amount must be positive.
- Transaction must be atomic (no partial updates).

If any validation fails:

- Display clear and meaningful error message to the user.

---

## Mandatory UI Requirements

The system must include dedicated UI screens:

### 1. Account Creation Screen

- Input fields for:
  - Account Number
  - Holder Name
  - Initial Balance
  - KYC Status
- Submit button
- Error/Success message display

---

### 2. Transaction Screens

Separate screens or sections for:

- Deposit
- Withdraw
- Transfer

Each must include:

- Required input fields
- Validation messages
- Result display

---

### 3. Account Listing Screen

- Display all accounts
- Show:
  - Account Number
  - Holder Name
  - Balance
  - KYC Status

---

### 4. Output Display Panel

- Display:
  - Success messages
  - Error messages
  - Transaction confirmations

---

## Validation Rules (Strict)

- No negative amounts allowed.
- No empty fields allowed.
- No duplicate account numbers.
- No transfer if KYC is false.
- No transfer or withdrawal if insufficient balance.
- Proper exception handling required.

---

## Deployment Requirements

- Application must be publicly deployed.
- Provide a working live URL.
- Ensure:
  - No runtime errors
  - Proper validation
  - Clean UI

Suggested deployment platforms:

- Render
- Vercel
- Netlify
- Railway
- AWS / Azure / GCP

---

## Code Style & Quality Expectations

- Clean and modular structure
- Separate logic from UI
- Proper naming conventions
- Comprehensive validation
- Efficient memory usage
- No redundant code
- Clear comments where necessary
- Structured folder organization

---

## Expected Deliverables

- Complete source code
- Public GitHub repository
- Live deployment URL
- This `TASK.md` file included in the repository

---

## Evaluation Criteria

| Criteria            | Weight    |
| ------------------- | --------- |
| Correct Logic       | High      |
| Validation Handling | High      |
| Transfer Security   | High      |
| UI Usability        | Medium    |
| Code Cleanliness    | High      |
| Deployment          | Mandatory |

---

## Final Task

Generate the **initial code structure and key functions** for the Online Bank Mini System, focusing on:

- Data model implementation
- Create Account logic
- Deposit logic
- Withdraw logic
- Secure Transfer logic

Provide the implementation in a **single, coherent response**, written in a clean, modular, intermediate-level developer style.

**End of Task Document**
