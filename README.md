## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messagse
- has_many :groups_users
- has_many :groups, through: :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
t.references :user, foreign_key: true
t.references :group, foreign_key: true

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users

t.references :tweet, index: true, foreign_key: true,