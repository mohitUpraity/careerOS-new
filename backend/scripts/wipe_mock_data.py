import asyncio
from sqlalchemy import text
from backend.app.core.database import engine

async def wipe_all_mock_and_test_data():
    print("Connecting to database to purge mock and test records...")
    async with engine.begin() as conn:
        # Delete test/mock data from child tables first to respect foreign keys
        try:
            print("Purging evidence table...")
            await conn.execute(text("DELETE FROM evidence;"))
        except Exception as e:
            print(f"Evidence table clean note: {e}")

        try:
            print("Purging skills table...")
            await conn.execute(text("DELETE FROM skills;"))
        except Exception as e:
            print(f"Skills table clean note: {e}")

        try:
            print("Purging applications table...")
            await conn.execute(text("DELETE FROM applications;"))
        except Exception as e:
            print(f"Applications table clean note: {e}")

        try:
            print("Purging opportunities table...")
            await conn.execute(text("DELETE FROM opportunities;"))
        except Exception as e:
            print(f"Opportunities table clean note: {e}")

        try:
            print("Purging default_user and mock profiles...")
            await conn.execute(text("DELETE FROM profiles WHERE user_id = 'default_user' OR user_id LIKE 'mock_%' OR user_id LIKE 'test_%';"))
            await conn.execute(text("DELETE FROM users WHERE id = 'default_user' OR id LIKE 'mock_%' OR id LIKE 'test_%';"))
        except Exception as e:
            print(f"Users/Profiles table clean note: {e}")

    print("All mock and test data purged successfully! Database is completely fresh.")
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(wipe_all_mock_and_test_data())
