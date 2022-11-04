import { generateAvailableUsername, generateAvailableDictionaryUsername } from '@wasp/core/auth.js';

// custom function to create a displayName for user based on google profile
// but still uses the default random username generation proivded by wasp
export async function getUserFields(_context, args) {
  const displayName = args.profile.displayName.split(' ')[0];
  // generate the random username as happens on default
  const username = await generateAvailableDictionaryUsername();
  return { displayName, username };
}
