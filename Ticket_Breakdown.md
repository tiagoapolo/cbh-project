# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Create CustomID Table

- Description: Create a CustomID table, with many to many relationship, that will translate the agent id in a specific facility to a custom id. The primary key of the Custom ID junction table consists of the agent and facility foreign keys.

- Acceptance Criteria:
    - I should be able to get the `custom_id` for an agent at a facility by querying the Custom Id junction table.
    - The Custom ID Table must have a custom id field that is required and should be a string, possibly a varchar(60)

- Estimate Effort: 4h

## Ticket 2: Create API to save custom ids for agents at facilities

- Description: Create an API to fetch, create, update or delete custom ids for agents at facilities.
- Add unit tests

- Acceptance Criteria:
    - I should be able fetch a single agent custom id or all agents custom ids in a facility.
    - I should be able to create an agent custom id at a facility
    - I should be able to update an agent custom id at a facility
    - I should be able to delete an agent custom id at a facility

- Estimate Effort: 8h

## Ticket 3: Update getShiftsByFacility method to support custom_id in the agent metadata.

- Description: Update the current `getShiftsByFacility` method to fetch the new custom_id from the Custom ID Table in the agent metadata.
- Add unit tests

- Acceptance Criteria:
    - I should be able to see the custom_id in the agent metadata if there's a record in the Custom ID Table, otherwise the custom_id will be null

- Estimate Effort: 10h

## Ticket 4: Update getShiftsByFacility method to support custom_id in the agent metadata.

- Description: Update the current `generateReport` to show the custom_id, if it's not null, instead of showing the internal agent id.
- Add unit tests

- Acceptance Criteria:
    - If an agent has a valid custom id it should show in the report instead of the internal agent id.

- Estimate Effort: 8h