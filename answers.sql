
CREATE TABLE callingagent(
  id INTEGER NOT NULL,
  name CHARACTER VARYING(50),
  location CHARACTER(3)
);
DROP TABLE callingagent


;
CREATE TABLE callinglogs (
  lead_id INT,
  list_id INT,
  campaign_id NVARCHAR(8),
  call_date DATE,
  start_timestamp DATETIME,
  end_timestamp DATETIME,
  length_in_sec SMALLINT,
  status NVARCHAR(20),
  phone_number NVARCHAR(20),
  caller_id INT
);
DROP TABLE callinglogs

INSERT INTO callingagent (id, name, location)
VALUES
  (1, 'John Doe', 'NYC'),
  (2, 'Jane Smith', 'LA'),
  (3, 'Alice Johnson', 'CHI'),
  (4, 'Bob Williams', 'SF'),
  (5, 'Eve Brown', 'MIA');


INSERT INTO callinglogs (lead_id, list_id, campaign_id, call_date, start_timestamp, end_timestamp, length_in_sec, status, phone_number, caller_id)
VALUES
  (101, 1, 'CAMP001', '2021-10-23', '2023-10-23 10:00:00', '2023-10-23 10:15:00', 200, 'Incomplete', '555-123-4567', 1),
   (101, 2, 'CAMP002', '2020-10-23', '2023-10-23 10:00:00', '2020-10-23 10:15:00', 200, 'Completed', '555-123-4567', 5),
    (101, 3, 'CAMP003', '2023-10-23', '2023-10-23 10:00:00', '2020-10-23 10:15:00', 200, 'Incomplete', '555-123-4567', 1),
     (101, 4, 'CAMP004', '2019-10-23', '2023-10-23 10:00:00', '2020-10-23 10:15:00', 200, 'Completed', '555-123-4567', 2),
      (101, 5, 'CAMP005', '2020-10-23', '2023-10-23 10:00:00', '2020-10-23 10:15:00', 200, 'Incomplete', '555-123-4567', 5)



-----------------------------------------
---------------QUESTION 1----------------
The length_in_sec field is of type smallint. Why do you think this an appropriate field type to
use for this particular data rather than an integer?
-------------ANSWER 1-------------------
We use SMALLINT for "length_in_sec" because its good for storing small numbers like seconds, and it saves storage space.


-----------------------------------------
---------------QUESTION 2----------------
Which of the agents in the callingagent table has the longest call?
-------------ANSWER 2-------------------
SELECT B.LENGTH_IN_SEC
FROM callingagent A
JOIN callinglogs B ON A.id = B.caller_id
ORDER BY B.LENGTH_IN_SEC DESC;

-----------------------------------------




---------------QUESTION 3----------------
How many calls have each of the agents in the callingagent table done? Only count calls that
are at least 1 second long. The columns should be “Caller ID”,” Name”, “Call Count”. If an
agent has made no calls a zero must be shown in the “Call Count” column.
-------------ANSWER 3-------------------
SELECT
  A.id AS Caller_ID,
  A.name AS Name,
  COALESCE(COUNT(B.lead_id), 0) AS Call_Count
FROM
  callingagent A
LEFT JOIN
  callinglogs B ON A.id = B.caller_id AND B.length_in_sec >= 1
GROUP BY
  A.id, A.name
ORDER BY
  A.id;

--------------------------QUESTION 3-------------------------------------------------------------------------------
Which location has the highest average call length? Only count calls that are at least 1
second long.
--------------------------ANSWER 3---------------------------------------------------------------------------------
SELECT * FROM callinglogs
SELECT * FROM callingagent


SELECT location, AVG(length_in_sec) AS average_call_length
FROM callingagent
JOIN callinglogs ON callingagent.id = callinglogs.caller_id
WHERE length_in_sec >= 1
GROUP BY location
ORDER BY average_call_length DESC



 -------------------QUESTION 4-------------------------
Which agent made the earliest call and how long was the call?
--------------------------ANSWER------------------------
SELECT A.CALL_DATE,A.LENGTH_IN_SEC,B.NAME
FROM callinglogs A JOIN callingagent B
ON A.CALLER_ID = B.ID
ORDER BY A.CALL_DATE ASC;