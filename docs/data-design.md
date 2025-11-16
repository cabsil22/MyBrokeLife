# My Broke Life – Data Design

## Users Collection

Stores authenticated users (OAuth-based).

| Field       | Type   | Required | Notes                                        |
|------------|--------|----------|-----------------------------------------------|
| _id        | ObjectId | yes    | Primary key                                   |
| provider   | String | yes      | e.g. `"google"`                               |
| providerId | String | yes      | ID from OAuth provider (sub)                  |
| name       | String | yes      | Display name                                  |
| email      | String | yes      | Unique per provider, used for contact         |
| avatar     | String | no       | URL to profile picture                        |
| createdAt  | Date   | yes      | Auto via timestamps                           |
| updatedAt  | Date   | yes      | Auto via timestamps                           |

---

## Categories Collection

User-defined categories for grouping transactions.

| Field     | Type     | Required | Notes                                      |
|----------|----------|----------|---------------------------------------------|
| _id      | ObjectId | yes      | Primary key                                 |
| userId   | ObjectId | yes      | FK → Users._id                              |
| name     | String   | yes      | Category name (e.g. “Groceries”)            |
| type     | String   | yes      | `"expense"` or `"income"`                   |
| color    | String   | no       | Hex or color token for UI                   |
| icon     | String   | no       | Icon name for UI                            |
| createdAt| Date     | yes      | Auto via timestamps                         |
| updatedAt| Date     | yes      | Auto via timestamps                         |

Constraints:
- Unique `(userId, name)` pair so a user can’t duplicate category names.

---

## Transactions Collection

Stores all individual income/expense events.

| Field       | Type     | Required | Notes                                      |
|------------|----------|----------|---------------------------------------------|
| _id        | ObjectId | yes      | Primary key                                 |
| userId     | ObjectId | yes      | FK → Users._id                              |
| categoryId | ObjectId | yes      | FK → Categories._id                         |
| amount     | Number   | yes      | Positive value                              |
| type       | String   | yes      | `"expense"` or `"income"`                   |
| date       | Date     | yes      | When the transaction occurred               |
| description| String   | no       | Optional note                               |
| currency   | String   | no       | e.g. `"USD"`, default `"USD"`               |
| createdAt  | Date     | yes      | Auto via timestamps                         |
| updatedAt  | Date     | yes      | Auto via timestamps                         |

Indexes:
- `userId + date` for quick filtering by user and time range.

---

## Budgets Collection

Monthly budget limits per category.

| Field       | Type     | Required | Notes                                       |
|------------|----------|----------|----------------------------------------------|
| _id        | ObjectId | yes      | Primary key                                  |
| userId     | ObjectId | yes      | FK → Users._id                               |
| categoryId | ObjectId | yes      | FK → Categories._id                          |
| month      | String   | yes      | `"YYYY-MM"` (e.g. `"2025-11"`)               |
| amount     | Number   | yes      | Budget limit for that month + category       |
| currency   | String   | no       | Default `"USD"`                              |
| createdAt  | Date     | yes      | Auto via timestamps                          |
| updatedAt  | Date     | yes      | Auto via timestamps                          |

Constraints:
- Unique `(userId, categoryId, month)` so only one budget per category per month.
