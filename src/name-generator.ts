/**
 * A TypeScript random name generator
 */

/**
 * Name parts for the generator
 */
class NameParts {
  static readonly firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Susan', 'Richard', 'Jessica', 'Joseph', 'Sarah',
    'Thomas', 'Karen', 'Charles', 'Nancy', 'Christopher', 'Lisa', 'Daniel', 'Margaret',
    'Matthew', 'Betty', 'Anthony', 'Sandra', 'Mark', 'Ashley', 'Donald', 'Dorothy',
    'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle'
  ];

  static readonly lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson',
    'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
    'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee',
    'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez',
    'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter'
  ];
}

/**
 * Generates random names
 */
export class NameGenerator {
  /**
   * Generates a random full name
   * @returns A randomly generated full name
   */
  static generateFullName(): string {
    return `${this._getRandomFirstName()} ${this._getRandomLastName()}`;
  }

  /**
   * Generates a list of random names
   * @param count Number of names to generate
   * @returns Array of randomly generated names
   */
  static generateNames(count: number): string[] {
    if (count < 1) {
      throw new Error('Count must be at least 1');
    }
    
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push(this.generateFullName());
    }
    
    return names;
  }

  /**
   * Gets a random first name
   * @returns A randomly selected first name
   * @private
   */
  private static _getRandomFirstName(): string {
    return NameParts.firstNames[Math.floor(Math.random() * NameParts.firstNames.length)];
  }

  /**
   * Gets a random last name
   * @returns A randomly selected last name
   * @private
   */
  private static _getRandomLastName(): string {
    return NameParts.lastNames[Math.floor(Math.random() * NameParts.lastNames.length)];
  }
}