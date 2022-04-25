// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos?',
  supabaseUrl: 'https://vpmtafvtfkzjqayxfuhp.supabase.co',
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbXRhZnZ0Zmt6anFheXhmdWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY2NDc3MDcsImV4cCI6MTk2MjIyMzcwN30.OICt9468g5WzqL0NAiyRttRjq3RCQA2vWllKh9yv0K4',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
/*
**GET Completed**
https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos?completed=eq.true

**GET Incomplete**
https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos?completed=eq.false

**GET All**
https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos


**ADD**
curl -X POST 'https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY" \
-H "Content-Type: application/json" \
-H "Prefer: return=representation" \
-d '{ "some_column": "someValue", "other_column": "otherValue" }'


**UPDATE**
curl -X PATCH 'https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos?some_column=eq.someValue' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY" \
-H "Content-Type: application/json" \
-H "Prefer: return=representation" \
-d '{ "other_column": "otherValue" }'


**DELETE**
curl -X DELETE 'https://vpmtafvtfkzjqayxfuhp.supabase.co/rest/v1/todos?some_column=eq.someValue' \
-H "apikey: SUPABASE_KEY" \
-H "Authorization: Bearer SUPABASE_KEY"

*/
