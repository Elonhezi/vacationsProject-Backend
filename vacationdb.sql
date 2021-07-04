CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(60, 36),
(60, 65),
(61, 2),
(61, 4),
(61, 36),
(61, 65);


CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET utf8 DEFAULT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(128) CHARACTER SET utf8 NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `users` (`userId`, `uuid`, `firstName`, `lastName`, `userName`, `password`, `isAdmin`) VALUES
(1, '6a8918fd-4866-4a33-90ad-2789981e1bf4', 'Elon', 'Hezi', 'lonlon2', '79d2e77e7821a49efeae680b20d1f9c23bea57bcda3c58f50c83907164bc70e98d2ea6564fbbbe32ee04cd59c12db836b6ddc55a10028c5b4731059dfa24dba2', 1),
(50, 'ab81d630-770e-4b46-ad6c-f9d4ac6f1d5e', 'Shir', 'Luzon', 'shirlu1', 'b3127b2524a074f9bdef0de636ab8e216f21cee5f97c045b2a54ed8111db95e31ef7aba230dc43740a8023aa435edc0f68c7c8aa8d3969e6b8d1d8abd6d85ced', 0),
(51, 'e153e712-42cc-41b0-8742-afd58bb4120b', 'Noa', 'Levi', 'noa3', 'aa80ae358fa0546e50dab0d86e144aec2899c6e506f5130353c0ff80781a91e4c2f6dd95f7945a6e7e8ed1fc9ec4ff25f03d0f1d60bbf44542d8a8138cf1ed50', 1),
(52, '444ca728-dc87-4b76-8011-400bf9244eaa', 'Nils', 'kuli', 'nili21', '12ed0f260b3bf22341a9ba2fddee95e515928b937e38856f87f0ac11b34a12acc78b797f700094e400b6a886528cbe7a553270ef4ab4dc125d882c15fdd44504', 0),
(53, 'b83bb58c-b481-4401-874f-37883c307db5', 'boni', 'gintzburg', 'bon1', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 0),
(54, '83b230a0-6246-4c4b-b630-b990af46ef7c', 'cool', 'body', 'cool3', 'b9c28fdd685e17061c2df8cabc5a8116039aaf5824d5872e172086b3544470c6b84debe0e74887e0548578ea2cce34dbac9d45cf7dd4ef1fa40a93502c08dc0a', 0),
(55, 'fdd84190-7d0c-4f62-8328-2817beb316c5', 'cool2', 'body', 'cool3', 'b9c28fdd685e17061c2df8cabc5a8116039aaf5824d5872e172086b3544470c6b84debe0e74887e0548578ea2cce34dbac9d45cf7dd4ef1fa40a93502c08dc0a', 0),
(56, 'b960b7bd-86d3-463f-bc4b-6bf49ca67441', 'cool22', 'body', 'cool3', 'b9c28fdd685e17061c2df8cabc5a8116039aaf5824d5872e172086b3544470c6b84debe0e74887e0548578ea2cce34dbac9d45cf7dd4ef1fa40a93502c08dc0a', 0),
(57, 'b36b6bf1-4bf3-4472-9529-9e1f3b74ee6e', 'cool22', 'body', 'cool3', 'b9c28fdd685e17061c2df8cabc5a8116039aaf5824d5872e172086b3544470c6b84debe0e74887e0548578ea2cce34dbac9d45cf7dd4ef1fa40a93502c08dc0a', 0),
(58, '3a0e7df2-3ccd-4275-a7b1-1341fab60fe3', 'doli', 'cream', 'dol1', '86042b912305c8d26d4cc2874e8c9781b9bc3a9fd0b4c31289d28a8918349cf652e6c43bd4eb0b7ff5e5b42956ee46a1edfe549de17c3f36c2fbf71dd939ecad', 0),
(59, '28580778-853f-47b2-abb7-65809dd850ea', 'user', 'anonimus', 'nobody', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 0),
(60, '5a57a151-3a77-4236-833c-a6869ef11955', 'Ron', 'Daniel', 'ron1', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 0),
(61, '2ecfb7d5-6a19-4cea-8485-b38b8b228289', 'lomp', 'dkook', 'lonlon1', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 0),
(67, '1e200f44-1440-492d-8ba4-2ee8d0c0d4be', 'elon', 'lon', 'holon', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 0),
(68, 'd6edbfa6-acba-4bc0-957e-641a0b7ce4af', 'dfsf', 'aaddaadsad', 'sasssad', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 0);


CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(11,0) NOT NULL,
  `description` varchar(300) NOT NULL,
  `img` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `vacations` (`vacationId`, `destination`, `startDate`, `endDate`, `price`, `description`, `img`) VALUES
(1, 'Orlando, FLorida', '2021-09-02', '2021-09-10', '3000', 'Spend a week or two in this family-friendly city to enjoy Florida’s warm sunshine. Visit a different theme park every day.', '3701fa97-198b-4677-8d1b-aa6e780b125a.jpg'),
(2, 'London, England', '2021-07-24', '2021-07-28', '950', 'If you\'re visiting London, England, for the first time, you may arrive expecting a European city that overflows with pomp and pageantry. Few visitors to London will fail to be impressed by the grandeur and craftsmanship of such monumental sights as Westminster Abbey or St. Paul\'s Cathedral, but that', '21ed70e9-e6b0-4303-b20c-f7c51d5a7e22.jpg'),
(3, 'New York', '2021-08-24', '2021-09-24', '2500', 'New York is a city filled with attractions, but some of its most interesting experiences are sure to be the ones you accidentally stumble upon on the way to somewhere else. Whatever it is you\'re looking for, you can find it in New York. Just don\'t try to do everything in one trip. ', '213c75ff-4b28-4eed-8f89-37d2ea64df5b.jpg'),
(4, 'Amsterdam, Holland', '2021-07-05', '2021-07-11', '500', 'Amsterdam is one of the greatest small cities in the world. From Amsterdam canals to world-famous Amsterdam museums and historical Amsterdam sights, it is one of the most romantic and beautiful cities in Europe. Canal cruises are a popular way to see the city from the perspective of its canals.', 'f639708e-775a-456e-b9e9-bdc0e36b382f.jpg'),
(5, 'Barcelona, Spain', '2021-10-06', '2021-10-12', '600', 'Catalonia and Barcelona has become one of the first tourist destination of Spain, it has everything to please the majority of visitors : with a history among the oldest in Europe, a capital, Barcelona, which never sleeps and an inland full of charm not to forget beautiful beaches in La Costa Brava. ', 'f0e6d17d-c6c7-468c-b515-6c72c9e64d91.jpeg'),
(36, 'Zanzibar, Tanzania', '2021-06-26', '2021-06-11', '97', 'asdadsad', '04f665b8-a7dd-4da2-8c21-6c0ecfecda9e.jpg'),
(63, 'Koh Tao, Thailand', '2021-08-02', '2024-08-15', '5000', 'best place ever!', '62604250-d673-4440-b4c5-e5f2ed9eec45.jpeg'),
(65, 'Moscow, Russia', '2022-11-24', '2022-12-08', '1997', 'beauty place', 'd5ee7769-7115-4a04-8514-c58face60ec0.jpeg'),
(79, 'Paris, France', '2021-06-11', '2021-06-22', '4000', 'nice', '67dab221-07c4-4215-a6bf-758f7ce08a4c.jpeg'),
(156, 'beer', '2019-11-03', '2020-11-30', '2', 'DADSD', 'a0842a50-c82f-465d-8de6-80e3d9d214e4.jpeg');

