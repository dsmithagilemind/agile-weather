// Define your own mock data here:

/*
{"data":[{"id":"cl9mx8fgd0000vww0i4fwp2vv","createdAt":"2022-10-24T15:16:03.518Z","updatedAt":"2022-10-24T20:22:56.485Z","zip":"79830","date":"2022-10-24T20:16:00.000Z"},{"id":"cl9n4zc680000vwgkdfq3zxix","createdAt":"2022-10-24T18:52:56.289Z","updatedAt":"2022-10-24T18:52:56.289Z","zip":"79831","date":"2022-10-24T18:52:56.268Z"},{"id":"cl9n4ze7h0002vwgkke9hu14l","createdAt":"2022-10-24T18:52:58.925Z","updatedAt":"2022-10-24T18:52:58.925Z","zip":"71233","date":"2022-10-24T18:52:58.908Z"},{"id":"cl9n86ygk0000vwfka4rmhld8","createdAt":"2022-10-24T20:22:50.612Z","updatedAt":"2022-10-24T20:22:50.612Z","zip":"12345","date":"2022-10-24T20:22:50.581Z"},{"id":"cl9n8793s0002vwfk87iqc3ik","createdAt":"2022-10-24T20:23:04.409Z","updatedAt":"2022-10-24T20:23:04.409Z","zip":"71233","date":"2022-10-24T20:23:04.388Z"},{"id":"cl9n87b440004vwfkiuzb0ej6","createdAt":"2022-10-24T20:23:07.012Z","updatedAt":"2022-10-24T20:23:07.012Z","zip":"79830","date":"2022-10-24T20:23:06.976Z"},{"id":"cl9oczcbi0000vwms12d4uext","createdAt":"2022-10-25T15:24:39.582Z","updatedAt":"2022-10-25T15:24:39.582Z","zip":"79830","date":"2022-10-25T15:24:39.556Z"}]}
*/

const response = {
  data: [
    {
      id: 'cl9mx8fgd0000vww0i4fwp2vv',
      createdAt: '2022-10-24T15:16:03.518Z',
      updatedAt: '2022-10-24T20:22:56.485Z',
      zip: '79830',
      date: '2022-10-24T20:16:00.000Z',
    },
    {
      id: 'cl9n4zc680000vwgkdfq3zxix',
      createdAt: '2022-10-24T18:52:56.289Z',
      updatedAt: '2022-10-24T18:52:56.289Z',
      zip: '79831',
      date: '2022-10-24T18:52:56.268Z',
    },
    {
      id: 'cl9n4ze7h0002vwgkke9hu14l',
      createdAt: '2022-10-24T18:52:58.925Z',
      updatedAt: '2022-10-24T18:52:58.925Z',
      zip: '71233',
      date: '2022-10-24T18:52:58.908Z',
    },
    {
      id: 'cl9n86ygk0000vwfka4rmhld8',
      createdAt: '2022-10-24T20:22:50.612Z',
      updatedAt: '2022-10-24T20:22:50.612Z',
      zip: '12345',
      date: '2022-10-24T20:22:50.581Z',
    },
    {
      id: 'cl9n8793s0002vwfk87iqc3ik',
      createdAt: '2022-10-24T20:23:04.409Z',
      updatedAt: '2022-10-24T20:23:04.409Z',
      zip: '71233',
      date: '2022-10-24T20:23:04.388Z',
    },
    {
      id: 'cl9n87b440004vwfkiuzb0ej6',
      createdAt: '2022-10-24T20:23:07.012Z',
      updatedAt: '2022-10-24T20:23:07.012Z',
      zip: '79830',
      date: '2022-10-24T20:23:06.976Z',
    },
    {
      id: 'cl9oczcbi0000vwms12d4uext',
      createdAt: '2022-10-25T15:24:39.582Z',
      updatedAt: '2022-10-25T15:24:39.582Z',
      zip: '79830',
      date: '2022-10-25T15:24:39.556Z',
    },
  ],
}

export const standard = (/* vars, { ctx, req } */) => ({
  zipSearches: response.data,
})
