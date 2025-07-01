-- Create Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TrainingDB')
BEGIN
    CREATE DATABASE TrainingDB;
END
GO

USE TrainingDB;
GO

-- Create Users Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(255) NOT NULL,
        Role NVARCHAR(50) NOT NULL,
        Department NVARCHAR(100) NULL,
        PhoneNumber NVARCHAR(20) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        LastLoginAt DATETIME2 NULL,
        IsActive BIT NOT NULL DEFAULT 1
    );
END
GO

-- Insert Demo Users (password: password123)
-- You can generate these hashes using BCrypt.Net.BCrypt.HashPassword("password123")
INSERT INTO Users (Name, Email, PasswordHash, Role, Department, CreatedAt, IsActive)
VALUES 
    ('John Employee', 'employee@demo.com', '$2a$11$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employee', 'Engineering', GETUTCDATE(), 1),
    ('Sarah L&D Manager', 'ld@demo.com', '$2a$11$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ld', 'Learning & Development', GETUTCDATE(), 1),
    ('Admin User', 'admin@demo.com', '$2a$11$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'Administration', GETUTCDATE(), 1)
ON DUPLICATE KEY UPDATE Name = VALUES(Name);
GO

-- Create Index for faster lookups
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Users_Email_Role')
BEGIN
    CREATE INDEX IX_Users_Email_Role ON Users(Email, Role);
END
GO

PRINT 'Database setup completed successfully!';
PRINT 'Demo users created:';
PRINT '- employee@demo.com (password: password123)';
PRINT '- ld@demo.com (password: password123)';
PRINT '- admin@demo.com (password: password123)'; 