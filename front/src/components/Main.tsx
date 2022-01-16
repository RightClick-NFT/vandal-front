import { useEthers } from "@usedapp/core";
import { Burning } from "./Burning";
import { Header } from "./Header";
import { Minting } from "./Minting";
import { TokenURI } from "./TokenURI";
import { FTokenURI } from "./fTokenURI";
import { Ranking } from "./Ranking";
import { useState } from "react";

export const Main = () => {
  const { account } = useEthers();
  const [ranking, setVis] = useState(false);
  const isConnected = account !== undefined;

  const clickRanking = () => {
    setVis(true);
  };

  return (
    <div className="App">
      <Header />
      <>
        <div style={{ width: "auto", margin: "auto" }} className="window">
          <div className="title-bar">
            <div className="title-bar-text">RightClick.exe</div>
            <div className="title-bar-controls">
              <button aria-label="Help" />
              <button aria-label="Close" />
            </div>
          </div>

          <div className="window-body">
            <fieldset
              style={{
                maxWidth: "640px",
                margin: "auto",
                letterSpacing: "1px",
                lineHeight: "2.2",
              }}
            >
              <legend>Introduction</legend>

              <p>
                {" "}
                Essentialy its <strong>
                  right-clicking using Solidity
                </strong>{" "}
                on-chain. If someones burns your right clicked NFT, you will
                receive a fee. Burner gets a better one tho. GLHF.{" "}
              </p>
              <ul
                className="tree-view"
                style={{ letterSpacing: "1px", lineHeight: "2.2" }}
              >
                <p>
                  Contract allows you to copy any ERC721 token metadata (usually
                  hyperlink and sometimes other type of object) on-chain. After
                  minting, returned NFT holds both copied metadata and its own
                  data available from the same contract under the same tokenId.
                  From the perspective of many available UIs (websites like
                  OpenSea) deciding to trust returned tokenURI values from
                  ERC721, your NFT will first display whatever other NFT
                  metadata you decided to copy. As long as target NFT exposes
                  tokenURI() function. Minting using RightClick returns also a
                  second NFT assigned to the same tokenId as 'hijacked' NFT. You
                  can burn other people NFTs to get rid of copied NFTs, the
                  whole amount is transferred to the owner of burned tokenId
                  (10x current mint price), while burner NFT receives proof of
                  burn NFT token. Because NFTs can be 'hijacked' only once, the
                  burner receives the final version of RightClick generated NFT
                  (copyright infringement free).
                </p>
                <li>
                  <details>
                    <summary>Core I: Breaking tokenURI()</summary>
                    <ul>
                      <li>
                        Contract has tokenURI and fTokenURI() functions, both
                        returning appropriate metadata for existing tokenId.
                        Calling fTokenURI() will return this contract's NFT
                        metadata, an SVG rendered image with values read from
                        current tokenId status. Therefore, the output of those
                        functions is not fixed throughout the lifetime of a
                        contract and will change depending on different users
                        interactions. One of the things happening when you
                        right-click (mint or, in other words, make a de facto
                        copy of some NFT metadata) new NFT is setting it in one
                        of three possible statuses.
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary>Core II: Minting, Burning, Status Changes</summary>
                    <ul>
                      <li>
                        <p>
                          <strong>Status 0 / Mint</strong>
                        </p>
                        After mint, NFT status is equal to 0. When calling
                        tokenURI() of this contract for given tokenId, returned
                        metadata will be a copied metadata (i.e. image) of mint
                        target NFT and its tokenId. When calling
                        fTokenURI()returned metadata will be equal to inputs
                        provided when minted. Additionally, to supplying
                        contract with address and tokenId of NFT you wish to
                        copy, you are required to specify message (tag). Tag is
                        your own signature, personal message, twitter handle or
                        whatever you want as long as it will fit into around 30
                        characters. Your tag can be edited if someone decides to
                        call burn on your tokenId.
                      </li>

                      <li>
                        <p>
                          <strong>Status 1 / From burn to mint </strong>
                        </p>
                        Status change to 1 is triggered by calling burn and
                        paying 'cleaning' fee to the owner of original
                        RightClick NFT. Burn and Mint dynamics is used as a sort
                        of Cops and Robbers game, of which the outcome defines
                        contract mint/burn pricing. Increasing or decreasing
                        cost of those operations linearly and will eventually
                        make removing copies expensive (and profitable to
                        make!). Burning allows anybody to destroy a copy of
                        priceless NFT-art metadata at only 10x the fee of the
                        current mint price (starting from 0.01337 ETH). The
                        amount is transferred fully to the original minter
                        (owner or, in other words, a person who originally
                        copied NFT using RightClick). Meaning that there is a
                        ceiling (so-called floor...) of how much status 0 NFTs
                        can be worth (Less than current burn price). When
                        calling tokenURI() and fTokenURI() of this contract for
                        given tokenId which status is equal to 1, the following
                        is returned: For burn caller, both tokenURI()and
                        fTokenURI() will return their SVG generated certificate
                        of a burn with message/tag included. Burn call will also
                        edit metadata of burned NFT, destroying its 'swag'
                        (Look, I copied Beeple 69 mil NFT) perceived value by
                        resetting its metadata to zero values. Destruction of
                        original RightClick minted NFT changes its status from 0
                        to 2, but you earned in ETH terms, yay!
                      </li>

                      <li>
                        <p>
                          <strong>
                            Status 2 / New state of Right Clicked NFT
                          </strong>
                        </p>
                        When NFT finds itself in status 2, tokenURI() function
                        no longer returns copied NFT metadata. Both tokenURUI()
                        and fTokenURI() now return zeroed by burn caller
                        metadata. Incremental ID is however still preserved.
                      </li>
                      <li>
                        <p>
                          <strong>Implications</strong>
                        </p>
                        All of the above status changes are reflected on-chain,
                        e.g your SVG certificate (image) returned by
                        tokenURI()/ftokenURI() will be updated automatically.
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary>Rules I: Basic</summary>
                    <ul>
                      <li>
                        Once NFT is tagged, it cannot be tagged again. Burn will
                        not change that state. You could classify it as rarity
                        metric.
                      </li>
                      <li>
                        Some NFT projects like CryptoPunks cannot be copied. For
                        example, CryptoPunks do not implement tokenURI()
                        function on which RightClick contract depends.
                      </li>
                      <li>
                        You cannot copy this contracts NFTs. That is, NFTs
                        minted by RightClick contract cannot be a target of
                        RightClick's mint() function.
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary>Traits I: Because why not?</summary>
                    <ul>
                      <li>
                        Ugly metadata can come in different variations too.
                        Implementation of such is not overly costly or
                        dangerous. Therefore, each mint certificate can come in
                        four window box color variations. Burn certificates all
                        come in pure gold, for, well, not because you overpaid,
                        mostly because why not?
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary>RightClick SVG images</summary>
                    <ul>
                      <li>
                        Renderer contract constructs SVG certificates of mint
                        and burn in style of Windows 98 graphical user interface
                        window box. SVG properties are hard-coded into contract
                        storage and take a set of arguments to return a full
                        Base64encoded image. This is both the easiest and least
                        elegant solution. All the functions are public view. In
                        practice, any user can render SVG for free with any
                        inputs they choose, omitting Rightclick's minting
                        function and just using Renderer. The difference is if
                        you care about the concept of'owning' it. In this
                        particular case, you would be referring to your address
                        being mapped to the tokenId on RightClick contract. In
                        itself, RigthClick is build in such a way that there is
                        no relation between mapping of your address and 'owned'
                        tokenId to actual image(s)generated/returned by one of
                        tokenURI() implementations. Just another funny quirk to
                        consider when thinking about the ownership relation
                        between contract and asset.
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary>Backlog / To not do</summary>
                    <ul>
                      <li>
                        Smart contracts architecture creates constrains on what
                        makes the cut into production based on
                        best-possible-prediction the developer can make about
                        how users will interact with the application, their
                        preferences and expectations. Trying to preserve the
                        idea of immutability, the author wanted to avoid
                        upgradeable patterns. This means dropping additional
                        logic, conditions and user defined 'game space' for this
                        project. Most of which are cost free in classic software
                        development, however utterly expensive for developer and
                        possibly later for users in so-called web3. At the same
                        time, it's a nature of contracts to expose their values
                        publicly to other contracts. Meaning, balances/user
                        values from this contract can easily be passed to the
                        new contract and re-used there with completely new logic
                        (like games or some exotic NFT price prediction market
                        incentivized from the get-go). This gate isn't
                        necessarily closed after releasing non-upgradable
                        contract. Because of getStatus() and set of iterator
                        functions available from OpenZeppelin
                        ERC721implementation, further development which includes
                        users of this contract is possible without making a
                        break from good smart contract pattern (keeping it
                        simple). At the same time, author will most likley not
                        do any of those things, but its very nice to think about
                        it! Its a solo project and there are significant
                        constrains to the amount of attention given. That being
                        said, the author is aware of many rough edges and
                        simplicity of the project in current form. In no tight
                        priority order, an application should receive at least:
                        <ul>
                          <li>
                            Basic data dashboard for minted/burned tokens.
                            Actual priority. That is because centralized
                            services like OpenSea will block display of your
                            minted NFT.
                          </li>
                          <li>
                            UI for additional contract functions like
                            getStatus() or isTagged()
                          </li>
                          <li>Gallery display</li>
                        </ul>
                      </li>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary>
                      Creator Notes I: Motivation, DNA of RightClick, Behavioral
                      Experimentation
                    </summary>
                    <ul>
                      <li>
                        Beyond a short technical explanation of the project
                        functionality, it's important to note the initial
                        motivation behind developing - in author's eyes -{" "}
                        <strong>
                          pretty useless and architecturally nonsensical smart
                          contract code.
                        </strong>{" "}
                        Firstly, the project started as an educational
                        experiment and a challenge to oneself in full stack
                        development with web3/eth included. That goal is
                        achieved to a satisfying degree. Secondly, RightClick is
                        supposed to be a tongue in cheek commentary to some of
                        an outlandish (childish?) claims about what a lot of NFT
                        projects actually are. RightClick contract was created
                        to challenge a notion of a strong ability to prove
                        ownership of a given NFT. Here, ownership of any
                        available on-chain NFT metadata is copied to any
                        interested party (an address)at small fee, whilst using
                        exactly the same network and computing power to deliver
                        consensus about ownership of given NFT for given private
                        key (owner addres).{" "}
                        <strong>
                          Act of copying ownership using RightClick's mint
                          should be understood as breaking off-chain social
                          contract about validity of receipt in face of fake
                          receipt for exactly the same object (NFT).
                        </strong>{" "}
                        Situation which pushes network participants to resolve
                        validity of claim question outside the network, i.e. by
                        reputation, seniority or any non-blockchain-network
                        means. RightClick also provides community with
                        no-scapegoat solution to fake receipt problem. Burn,
                        beyond serving as economical mechanism (surprise,
                        surprise), serves also as catharsis mechanism for any
                        targeted owners of original ('true' owners, those who
                        RightClick users target and copy) NFTs. In place of
                        confused legal flexing on social media, burn will just
                        remove an annoying jest and also send a direct message
                        to a vandal responsible (with ETH inside).
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </fieldset>

            <fieldset className="wrapFieldSet">
              <legend>Minting</legend>
              <p>Requirements for right-clicking on-chain</p>
              <ul>
                <li>Specify contract address of NFT you want to right-click</li>
                <li>Enter tokenId of specific NFT you want to right-click</li>
                <li>
                  Provide a tag. Signature, personal message, whatever. Max 30
                  characters.
                </li>
                <li>Copied Beeple NFT on tokenURI()</li>
                <li>RightClick Copy Certificate on ftokenURI()</li>
              </ul>
              <Minting />
            </fieldset>

            <fieldset className="wrapFieldSet">
              <legend>Burning</legend>
              <p>
                Requirements for reverting harmful right-clicker actions. Delete
                his on-chain copied NFT here. 100% of burn cost is forwarded to
                ownerOf tokenId you are burning.
              </p>
              <ul>
                <li>Feel outraged?</li>
                <li>
                  Enter right-click nft tokenId you want to remove from chain.
                  You need to know it first. Right now this requires querying
                  different contract functions or looking directly on-chain (ie.
                  etherscan). RightClick tokenIds are incremental. Author is
                  implementing nice UI solution as top priority.
                </li>
                <li>Burn will eat up 10x the cost of someone copying.</li>
                <li>
                  Your tag will also be set as new tag of burned/cleaned NFT.
                  (Check display of burned tokenId for giggles)
                </li>
                <li>RightClick Burn Certificate (gold) on tokenURI()</li>
                <li>RightClick Burn Certificate (standard) of ftokenURI()</li>
                <li>Owner of burned tokenId metadata deleted.</li>
              </ul>
              <Burning />
            </fieldset>

            <fieldset className="wrapFieldSet">
              <legend>
                View <strong>tokenURI</strong>
              </legend>
              <p>Standard implementation of tokenURI. AKA Your 'real' NFT.</p>
              <ul>
                <li>
                  Status 0 (Mint tokenId): Right click copy of some NFT (ipfs,
                  http or maybe svg string)
                </li>
                <li>
                  Status 1 (Burn tokenId): SVG Image of burn certificate with
                  burner address and message.{" "}
                </li>
                <li>
                  Status 2 (Mint tokenId burned): SVG Image with zeroed copied
                  metadata and message by burner.{" "}
                </li>
                <li>
                  Output of this function depends on a state (right-clicked /
                  burned){" "}
                </li>
              </ul>
              <TokenURI />
            </fieldset>

            <fieldset className="wrapFieldSet">
              <legend>
                View <strong>ftokenURI</strong>
              </legend>
              <p>Hidden tokenURI(). AKA ftokenURI() AKA Your other NFT. </p>
              <ul>
                <li>
                  Status 0 (Mint tokenId): Actual minted RightClick NFT with its
                  metadata rendered on SVG image
                </li>
                <li>
                  Status 1 (Burn tokenId): Burner specific RightClick NFT with
                  information about what NFT was cleaned.
                </li>
                <li>
                  Status 2 (Mint tokenId burned): SVG Image with zeroed copied
                  metadata and message by burner.{" "}
                </li>
              </ul>
              <FTokenURI />
            </fieldset>

            <fieldset className="wrapFieldSet">
              <legend>Ranking</legend>
              <div>
                {ranking ? (
                  <div className="RankingPage">
                    {" "}
                    <>
                      <Ranking />{" "}
                    </>
                  </div>
                ) : null}
              </div>
            </fieldset>

            <fieldset className="wrapFieldSet">
              <legend>Socialism</legend>
              <div className="Socialism">
                <a href="https://etherscan.io/address/0xbfE6B3B37e1Bd624b6eE25FdAEa13B12446ed799">
                  <button>Etherscan</button>
                </a>
                <a href="https://twitter.com/RightClickEXE">
                  <button>Twitter</button>
                </a>
                <a href="https://github.com/RightClick-NFT">
                  <button>Github</button>
                </a>
                <button disabled>Community</button>
                <button onClick={clickRanking}>Ranking</button>
              </div>
            </fieldset>
          </div>
        </div>
      </>
    </div>
  );
};
